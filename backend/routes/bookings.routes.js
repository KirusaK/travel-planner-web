//                                                         //
///// Здесь все запросы которые связанные с Резервацией /////
//

import {Router} from 'express';
import {pool} from '../db/db.js'

const router = Router();

router.get("/", async (req, res) => {
    try {
        const {limit} = req.query;

        let query =
            `select 
        b.id,
        trim(u.first_name || ' ' || last_name) as "customerName",
        upper(substring(u.first_name from 1 for 1) || substring(u.last_name from 1 for 1)) as initials,
        u.email as "customerEmail",
        b.item_type as "itemType",
        b.title as "title",
        to_char(b.created_at, 'DD.MM.YYYY') as date,
        initcap(b.payment_type) as payment,
        b.total_price::float as amount,
        b.status
      from bookings b
      join users u on u.id = b.user_id
      order by b.id desc`;

        const params = [];
        if (limit) {
            query += ` LIMIT $1`;
            params.push((parseInt(limit, 10)))
        }

        const {rows} = await pool.query(query, params);
        res.json(rows);
    } catch (err) {
        console.error("Error fetching bookings list:", err);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/my", async (req, res) => {
    try {
        const {rows} = await pool.query(`
            select 
                b.id,
                b.item_id as "itemId",
                b.item_type as "itemType",
                b.title as "title",
                to_char(b.created_at, 'DD.MM.YYYY') as date,
                b.total_price::float as amount,
                b.status,
                f.airline_name as "airlineName",
                f.logo,
                case when f.id is not null then coalesce((
                    select json_agg(json_build_object(
                        'date', to_char(t.trip_date, 'DD-MM-YY'),
                        'departureTime', to_char(t.departure_time, 'HH24:MI'),
                        'arrivalTime', to_char(t.arrival_time, 'HH24:MI'),
                        'durationMinutes', t.duration_minutes,
                        'departureCode', t.departure_code,
                        'arrivalCode', t.arrival_code
                    ) order by t.sort_order)
                    from flight_trips t
                    where t.flight_id = f.id
                ), '[]'::json) end as trips,
                h.name as "hotelName",
                h.address,
                (select r.image_url from hotel_rooms r
                    where r.hotel_id = h.id
                    order by r.sort_order limit 1) as cover
            from bookings b
            left join flights f on b.item_type = 'flight' and f.id::text = b.item_id
            left join hotels h on b.item_type = 'hotel' and h.id::text = b.item_id
            where b.user_id = $1
            order by b.id desc;`,
            [req.user.id]
        );

        res.json(rows);
    } catch (err) {
        console.error("Error fetching my bookings list:", err);
        res.status(500).json({ error: "Server error" });
    }
})

// Создание бронирования
router.post("/", async (req, res) => {
    const { userId, cardId, itemType, itemId, title, totalPrice, paymentType = "full" } = req.body;
    const status = paymentType === "full" ? "confirmed" : "pending";

    if (!cardId || !itemId || !totalPrice) {
        return res.status(400).json({ error: "Missing required field" });
    }

    if (!["full", "partial"].includes(paymentType)) return res.status(400).json({ error: "Invalid payment type" });

    try {
        const result = await pool.query(
            `INSERT INTO bookings (user_id, card_id, item_type, item_id, title, total_price, payment_type, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
            [req.user.id, cardId, itemType, itemId, title, totalPrice, paymentType, status],
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error creating bookings:", err);
        res.status(500).json({ error: "Failed to create booking" });
    }
});

// Получение информации о бронировании по id
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("SELECT * FROM bookings WHERE id = $1", [
            id,
        ]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Booking not found." });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching bookings:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;