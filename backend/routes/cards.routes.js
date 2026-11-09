//                                                     //
///// Здесь все запросы которые связанные с Картами /////
//

import {Router} from 'express';
import {pool} from '../db/db.js'

const router = Router();

router.post("/", async (req, res) => {
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

router.get("/", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

export default router;