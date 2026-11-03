import express from "express";
import cors from "cors";
import dotenv, {parse} from "dotenv";
import { pool } from "./db/db.js";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



//                                                           //
///// Здесь все запросы которые связанные с Пользователем /////
//                                                           //



app.post("/api/auth/register", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userCheck.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "A user with this email already exists." });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = await pool.query(
      `INSERT INTO users (first_name, last_name, email, phone_number, password) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, first_name, last_name, email, phone_number`,
      [firstName, lastName, email, phone, passwordHash],
    );

    res.status(201).json({
      message: "User registered successfully.",
      user: newUser.rows[0],
    });
  } catch (err) {
    console.error("Error during registration:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userCheck.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const user = userCheck.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    res.status(200).json({
      message: "Login successful.",
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone_number,
      },
    });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

const PROFILE_SELECT = `
  SELECT id,
         TRIM(first_name || ' ' || last_name) AS name,
         email,
         phone_number AS "phoneNumber",
         to_char(date_of_birth, 'YYYY-MM-DD') AS "dateOfBirth"
  FROM users`;

app.get("/api/users", async (req, res) => {
  try {
    const { rows } = await pool.query(`
    select 
      u.id,
      u.first_name as "firstName",
      u.last_name as "lastName",
      u.email,
      u.phone_number as "phoneNumber",
      'Not specified' as country,
      to_char(u.created_at, 'DD.MM.YYYY') as joined,
      (select count(*) from bookings b where b.user_id = u.id)::int as "bookingsCount",
      'Active' as status
    from users u
    order by u.id desc`);

    res.json(rows);
  } catch (err) {
    console.error("Error fetching users for admin:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const { rows } = await pool.query(`${PROFILE_SELECT} WHERE id = $1`, [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ error: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.patch("/api/users/:id", async (req, res) => {
  const { field, value } = req.body;
  const { id } = req.params;
  let sql, params;

  switch (field) {
    case "name": {
      const [first, ...rest] = String(value).trim().split(/\s+/);
      if (!first) return res.status(400).json({ error: "Name is required" });
      sql = "UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3";
      params = [first, rest.join(" "), id];
      break;
    }
    case "email":
      if (!value || !String(value).includes("@"))
        return res.status(400).json({ error: "Invalid email" });
      sql = "UPDATE users SET email = $1 WHERE id = $2";
      params = [String(value).trim(), id];
      break;
    case "phoneNumber":
      sql = "UPDATE users SET phone_number = $1 WHERE id = $2";
      params = [value || null, id];
      break;
    case "dateOfBirth":
      sql = "UPDATE users SET date_of_birth = $1 WHERE id = $2";
      params = [value || null, id];
      break;
    default:
      return res.status(400).json({ error: "Field not allowed" });
  }

  try {
    await pool.query(sql, params);
    const { rows } = await pool.query(`${PROFILE_SELECT} WHERE id = $1`, [id]);
    res.json(rows[0]);
  } catch (err) {
    if (err.code === "23505")
      return res.status(409).json({ error: "Email already in use" });
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.patch("/api/users/:id/password", async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword || newPassword.length < 6) {
    return res
      .status(400)
      .json({ error: "New password must be at least 6 characters" });
  }
  try {
    const { rows } = await pool.query(
      "SELECT password FROM users WHERE id = $1",
      [req.params.id],
    );
    if (rows.length === 0)
      return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, rows[0].password);
    if (!isMatch)
      return res.status(403).json({ error: "Wrong current password" });

    const hash = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [
      hash,
      req.params.id,
    ]);
    res.json({ ok: true });
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ error: "Server error" });
  }
});



//                                                     // 
///// Здесь все запросы которые связанные с Картами /////
//                                                     //



app.post("/api/cards", async (req, res) => {
  try {
    const { userId, cardNumber, expDate, nameOnCard, country, isSaved } =
      req.body;

    if (!userId || !cardNumber || !expDate || !nameOnCard) {
      return res
        .status(400)
        .json({ message: "Заполните все обязательные поля" });
    }

    const newCard = await pool.query(
      `INSERT INTO cards (user_id, card_number, exp_date, name_on_card, country, is_saved)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [userId, cardNumber, expDate, nameOnCard, country, isSaved ?? true],
    );

    res.status(201).json(newCard.rows[0]);
  } catch (err) {
    console.error("Error adding card:", err);
    res.status(500).json({ message: "Ошибка сервера при добавлении карты" });
  }
});

app.get("/api/cards", async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  try {
    // Выполняем SQL запрос к вашей таблице cards
    const result = await pool.query(
      "SELECT * FROM cards WHERE user_id = $1 ORDER BY id DESC",
      [userId],
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching cards:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/api/cards/:id", async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM cards WHERE id = $1", [
      req.params.id,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Card not found" });
    }

    res.sendStatus(204);
  } catch (err) {
    // 23503 = картка прив'язана до бронювань (foreign key)
    if (err.code === "23503") {
      return res
        .status(409)
        .json({ error: "Card is used in bookings and cannot be deleted" });
    }
    console.error("Error deleting card:", err);
    res.status(500).json({ error: "Server error" });
  }
});



//                                                         //
///// Здесь все запросы которые связанные с Резервацией /////
//                                                         //



app.get("/api/bookings", async (req, res) => {
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
        'Full' AS payment,
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

// Создание бронирования
app.post("/api/bookings", async (req, res) => {
  const { userId, cardId, itemType, itemId, title, totalPrice } = req.body;

  if (!userId || !cardId || !itemId || !totalPrice) {
    return res.status(400).json({ error: "Missing required field" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO bookings (user_id, card_id, item_type, item_id, title, total_price)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [userId, cardId, itemType, itemId, title, totalPrice],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating bookings:", err);
    res.status(500).json({ message: "Failed to create booking" });
  }
});

// Получение информации о бронировании по id
app.get("/api/bookings/:id", async (req, res) => {
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



//                                                      //
///// Здесь все запросы которые связанные с полетами /////
//                                                      //



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
app.get("/api/flights", async (req, res) => {
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

app.get("/api/flights/:id", async (req, res) => {
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

app.post("/api/flights", async (req, res) => {
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

app.put("/api/flights/:id", async (req, res) => {
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

app.delete("/api/flights/:id", async (req, res) => {
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



//                                                     //
///// Здесь все запросы которые связанные с отелями /////
//                                                     //



const HOTEL_COLUMNS = `
  h.id,
  h.name,
  h.logo_url as "logoUrl",
  h.address,
  h.google_maps_url as "googleMapsUrl",
  h.map_embed_url as "mapEmbedUrl",
  h.description,
  h.features,
  h.price_per_night::float as "pricePerNight",
  h.rating::float as rating,
  h.reviews_count as "reviewsCount"
`;

async function insertRooms (client, hotelId, rooms) {
  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];

    await client.query(`
      insert into hotel_rooms (
        hotel_id, sort_order, title, price, image_url
      ) values ($1, $2, $3, $4, $5)`,
        [
          hotelId,
          i,
          room.title.trim(),
          Number(room.price),
          room.imageUrl || null,
        ],
    );
  }
}

async function insertAmenities (client, hotelId, amenitiesIds) {
  if (!Array.isArray(amenitiesIds) || amenitiesIds.length === 0) return;

  await client.query(`
    insert into hotel_amenities (hotel_id, amenity_id)
    select $1, unnest($2::int[])
    on conflict do nothing`,
      [hotelId, amenitiesIds]
  )
}

function validateHotel ({name, address, googleMapsUrl, mapEmbedUrl, description, pricePerNight, rooms}) {
  if (
      !name?.trim() ||
      !address?.trim() ||
      !googleMapsUrl?.trim() ||
      !mapEmbedUrl?.trim() ||
      !description?.trim()
  )
    return "Not all fields have been filled in ";

  if (!(Number(pricePerNight) > 0)) return "Price per night must be greater than 0";
  if (!Array.isArray(rooms) || rooms.length === 0) return "At least one room is required";
  if (rooms.some((r) => !r.title?.trim() || !(Number(r.price) > 0))) return "Each room needs a title and a price > 0";

  return null;
}

app.get("/api/hotels", async (req, res) => {
  try {
    const { rows } = await pool.query(`
      select ${HOTEL_COLUMNS},
        (select count(*) from hotel_rooms r 
            where r.hotel_id = h.id)::int as "roomsCount",
        (select count(*) from hotel_amenities a
            where a.hotel_id = h.id)::int as "amenitiesCount",
        (select image_url from hotel_rooms r
            where r.hotel_id = h.id
            order by r.sort_order LIMIT 1) as cover
      from hotels h
      order by h.id
    `);

    res.json(rows);
  } catch (err) {
    console.error("Error fetching  hotels:", err);
    res.status(500).json({error: "Server error"});
  }
})

app.get("/api/hotels/:id", async (req, res) => {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const hotel = await pool.query(`
      select ${HOTEL_COLUMNS} from hotels h where h.id = $1`,
      [id],
    );

    if (hotel.rows.length === 0) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    const rooms = await pool.query(`
      select id, 
             title, 
             price::float as price, 
             image_url as "imageUrl"
      from hotel_rooms r
      where r.hotel_id = $1
      order by sort_order`,
      [id],
    )

    const amenities = await pool.query(
      `
      select a.id,
             a.name,
             a.icon
      from hotel_amenities ha
      join amenities a on a.id = ha.amenity_id
      where ha.hotel_id = $1
      ORDER BY a.id`,
      [id],
    );

    const reviews = await pool.query(`
      select id,
             author_name as "authorName",
             avatar_url as "avatarUrl" ,
             rating::float as rating,
             text
      from hotel_reviews 
      where hotel_id = $1
      ORDER BY created_at DESC, id DESC`,
      [id],
    );

    res.json({
      ...hotel.rows[0],
      rooms: rooms.rows,
      amenities: amenities.rows,
      reviews: reviews.rows,
    });
  } catch (err) {
    console.error("Error fetching  hotels:", err);
    res.status(500).json({error: "Server error"});
  }
})

app.post("/api/hotels", async (req, res) => {
  const {
    name,
    logoUrl,
    address,
    googleMapsUrl,
    mapEmbedUrl,
    description,
    features,
    pricePerNight,
    rooms,
    amenitiesIds,
  } = req.body;

  const price = Number(pricePerNight);

  const validationError = validateHotel(req.body);
  if (validationError) return res.status(400).json({error: validationError});

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const hotelResult = await client.query(`
      insert into hotels (
                          name,
                          logo_url,
                          address,
                          google_maps_url,
                          map_embed_url,
                          description,
                          features,
                          price_per_night         
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8)
      returning id`,
        [
          name.trim(),
          logoUrl || null,
          address.trim(),
          googleMapsUrl || null,
          mapEmbedUrl || null,
          description,
          Array.isArray(features) ? features : [],
          price,
        ]
    );

    const newHotelId = hotelResult.rows[0].id;
    await insertRooms(client, newHotelId, rooms);
    await insertAmenities(client, newHotelId, amenitiesIds);

    await client.query('COMMIT');
    res.status(201).json({ message: "Hotel created successfully", hotelId: newHotelId });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Error adding  hotels:", err);
    res.status(500).json({error: "Server error"});
  } finally {
    client.release();
  }
})

app.put("/api/hotels/:id", async (req, res) => {
  const {id} = req.params;

  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const {
    name,
    logoUrl,
    address,
    googleMapsUrl,
    mapEmbedUrl,
    description,
    features,
    pricePerNight,
    rooms,
    amenitiesIds,
  } = req.body;

  const validationError = validateHotel(req.body);
  if (validationError) return res.status(400).json({error: validationError});

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const result = await client.query(`
      update hotels 
        set name = $1, logo_url = $2, address = $3, google_maps_url = $4,
            map_embed_url = $5, description = $6, features = $7, price_per_night = $8
            where id = $9`,
        [
          name.trim(),
          logoUrl || null,
          address.trim(),
          googleMapsUrl || null,
          mapEmbedUrl || null,
          description,
          Array.isArray(features) ? features : [],
          Number(pricePerNight),
          id,
        ],
    );

    if (result.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({error: "Hotel not found"});
    }

    await client.query(`delete from hotel_rooms where hotel_id  = $1`, [id])
    await client.query(`delete from hotel_amenities where hotel_id  = $1`, [id])
    await insertRooms(client, id, rooms);
    await insertAmenities(client, id, amenitiesIds);

    await client.query('COMMIT');
    res.json({message: "Hotel updated successfully", hotelId: Number(id)})
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Error updating  hotels:", err.message);
    res.status(500).json({error: "Server error"});
  } finally {
    client.release();
  }
})

app.delete("/api/hotels/:id", async (req, res) => {
  const {id} = req.params;

  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: "Invalid hotel id" });
  }

  try {
    const result = await pool.query(`
      delete from hotels where id = $1 returning id 
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({error: "Hotel not found"});
    }

    res.json({message: "Hotel deleted successfully", id: result.rows[0].id});
  } catch (err) {
    console.error("Error deleting hotels:", err);
    res.status(500).json({error: "Server error"});
  }
})

app.get("/", (req, res) => {
  res.send("API сервера работает!");
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
