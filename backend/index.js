import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db/db.js";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

const PROFILE_SELECT = `
  SELECT id,
         TRIM(first_name || ' ' || last_name) AS name,
         email,
         phone_number AS "phoneNumber",
         to_char(date_of_birth, 'YYYY-MM-DD') AS "dateOfBirth"
  FROM users`;

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

// Удаление карты
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
  f.base_price::float as price, 
  to_char(f.part_due_date, 'YYYY-MM-DD') AS "partDueDate"`;


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
      [id],
    );

    res.json({...flight.rows[0], trips: trips.rows});
  } catch (err) {
    console.error("Error fetching  flights:", err);
    res.status(500).json({error: "Server error"});
  }
})

const HOTEL_COLUMNS = `
  h.id,
  h.name,
  h.logo_url as "logoUrl",
  h.country,
  h.city,
  h.address,
  h.google_maps_url as "googleMapsUrl",
  h.map_embed_url as "mapEmbedUrl",
  h.description,
  h.features,
  h.price_per_night::float as "pricePerNight",
  h.rating::float as rating,
  h.reviews_count as "reviewsCount",
  to_char(h.part_due_date, 'YYYY-MM-DD') as "partDueDate"
`;

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

app.get("/", (req, res) => {
  res.send("API сервера работает!");
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
