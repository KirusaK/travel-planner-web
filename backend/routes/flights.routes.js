//                                                      //
///// Здесь все запросы которые связанные с полетами /////
//                                                      //

import {Router} from 'express';
import {pool} from '../db/db.js'

const router = Router();

const FLIGHT_COLUMNS = `
  f.id, 
  f.airline_name as "airlineName", 
  f.logo, 
  f.flight_class as "flightClass", 
  f.rating::float as rating, 
  f.reviews_count as "reviewsCount", 
  f.airport, 
  f.from_code as"from", 
  f.to_code as "to", 
  f.base_price::float as price
  `;

async function insertSegments (client, flightId, segments, fromAirport, toAirport) {
    for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        const isReturn = seg.segmentLabel === "Return";

        await client.query(`
      insert into flight_trips (
        flight_id, sort_order, direction, trip_date, departure_time, arrival_time, duration_minutes, departure_airport, departure_code, arrival_airport, arrival_code, stops, status, aircraft
      ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
            [
                flightId,
                i,
                seg.segmentLabel,
                seg.date,
                seg.departureTime,
                seg.arrivalTime,
                Number(seg.durationMinutes) || 120,
                seg.departureAirport,
                isReturn ? toAirport : fromAirport,
                seg.arrivalAirport,
                isReturn ? fromAirport : toAirport,
                seg.flightType,
                seg.status,
                seg.aircraftType,
            ],
        );
    }
}

function validateFlight ({airlineName, flightClass, airportLocation, fromAirport, toAirport, basePrice}) {
    if (!airlineName?.trim() || !flightClass?.trim() || !airportLocation?.trim() || !fromAirport?.trim() || !toAirport?.trim()) return "Not all fields have been filled in" ;
    if (!(Number(basePrice) > 0)) return "Invalid price";

    return null;
}

// Короче тут выводятся все поля таблици и заодно подсчитывается количество полетов (segments) для админки и достаем информацию для страници листига
router.get("/", async (req, res) => {
    try {
        const { rows } = await pool.query(`
    SELECT ${FLIGHT_COLUMNS},
    (SELECT COUNT(*) FROM flight_trips t
                     WHERE t.flight_id = f.id)::int as "tripsCount",
                    COALESCE((
                        SELECT json_agg(json_build_object(
                                        'departureTime', to_char(t.departure_time, 'HH24:MI'),
                                        'arrivalTime', to_char(t.arrival_time, 'HH24:MI'),
                                        'durationMinutes', t.duration_minutes,
                                        'stops', t.stops,
                                        'departureCode', t.departure_code,
                                        'arrivalCode', t.arrival_code
                                        ) ORDER BY t.sort_order)
                        FROM flight_trips t
                        WHERE t.flight_id = f.id
                      ), '[]'::json) AS trips
    FROM flights f
    ORDER BY f.id`);

        res.json(rows);
    } catch (err) {
        console.error("Error fetching  flights:", err);
        res.status(500).json({ error: "Server error" });
    }
})

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }

    try {
        const flight = await pool.query(`
    SELECT ${FLIGHT_COLUMNS} FROM flights f WHERE f.id = $1`,[id]);

        if (flight.rows.length === 0) {
            return res.status(404).json({ error: "Flight not found" });
        }

        const trips = await pool.query(
            `
    select id,
           direction,
           to_char(trip_date, 'YYYY-MM-DD') as date,
           to_char(departure_time, 'HH24:MI') as "departureTime",
           to_char(arrival_time, 'HH24:MI') as "arrivalTime",
           duration_minutes as "durationMinutes",
           departure_airport as "departureAirport",
           departure_code as "departureCode",
           arrival_airport as "arrivalAirport",
           arrival_code as "arrivalCode",
           stops,
           status,
           aircraft
    from flight_trips t
    where flight_id = $1
    order by sort_order`,
            [id]
        );

        res.json({...flight.rows[0], trips: trips.rows});
    } catch (err) {
        console.error("Error fetching  flights:", err);
        res.status(500).json({ error: "Server error" });
    }
})

router.post("/", async (req, res) => {
    const {
        airlineName,
        airlineLogo,
        flightClass,
        airportLocation,
        fromAirport,
        toAirport,
        basePrice,
        segments = [],
    } = req.body;

    const price = Number(basePrice);

    if (segments.some((s) => !s.date || !s.departureTime || !s.arrivalTime)) {
        return res.status(400).json({error: "Each segment needs a date, departure and arrival time"});
    };

    const validationError = validateFlight({airlineName, flightClass, airportLocation, fromAirport, toAirport, basePrice});
    if (validationError) return res.status(400).json({error: validationError});


    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const flightResult = await client.query(
            `
      insert into flights (
                           airline_name, 
                           logo, 
                           flight_class,  
                           airport, 
                           from_code, 
                           to_code, 
                           base_price
      )
      values ($1, $2, $3, $4, $5, $6, $7)
      returning id`,
            [
                airlineName,
                airlineLogo,
                flightClass || "Economy",
                airportLocation,
                fromAirport,
                toAirport,
                price,
            ],
        );

        const newFlightId = flightResult.rows[0].id;

        await insertSegments(client, newFlightId, segments, fromAirport, toAirport);

        await client.query("COMMIT");
        res
            .status(201)
            .json({ message: "Flight created successfully", flightId: newFlightId });
    } catch (err) {
        await client.query("ROLLBACK");
        console.error("Error adding flights", err);
        res.status(500).json({ error: "Server error" });
    } finally {
        client.release();
    }
})

router.put("/:id", async (req, res) => {
    const {id} = req.params;

    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }

    const {
        airlineName,
        airlineLogo,
        flightClass,
        airportLocation,
        fromAirport,
        toAirport,
        basePrice,
        segments = [],
    } = req.body;

    const price = Number(basePrice);

    const validationError = validateFlight({airlineName, flightClass, airportLocation, fromAirport, toAirport, basePrice});
    if (validationError) return res.status(400).json({error: validationError});

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const result = await client.query(`
      update flights 
        set airline_name = $1, logo = $2,flight_class = $3,
            airport = $4, from_code = $5, to_code = $6,  base_price = $7
            where id = $8`,
            [airlineName, airlineLogo, flightClass, airportLocation, fromAirport, toAirport, price, id]
        );

        if (result.rowCount === 0) {
            await client.query("ROLLBACK");
            return res.status(404).json({ error: "Flight not found" });
        }

        await client.query(`delete from flight_trips where flight_id = $1 `, [id]);
        await insertSegments(client, id, segments, fromAirport, toAirport);

        await client.query("COMMIT");
        res.json({message: "Flight updated successfully", flightId: Number(id)});
    } catch (err) {
        await client.query("ROLLBACK");
        console.error("Error updating  flight", err.message);
        res.status(500).json({ error: "Server error" });
    } finally {
        client.release();
    }
})

router.delete("/:id", async (req, res) => {
    const {id} = req.params;

    try {
        const result = await  pool.query("delete from flights where id = $1", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Flight not found" });
        }

        res.json({ message: "Flight deleted successfully", id });
    } catch (err) {
        console.error("Error deleting flight", err);
        res.status(500).json({ error: "Server error" });
    }
})

export default router;
