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
router.post("/", async (req, res) => {
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