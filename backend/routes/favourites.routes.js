import { Router} from 'express';
import {pool} from '../db/db.js'

const router = Router();
const TYPES = ["flight", "hotel"];

router.get('/', async (req, res) => {
    try {
        const {limit, type} = req.query;
        const params = [req.user.id];
        let query = `select * from favorites where user_id = $1`;

        if (type) {
            if (!TYPES.includes(type)) return res.status(400).send("Invalid type");

            params.push(type);
            query += ` and item_type = $${params.length}`;
        }

        query += ` order by created_at  desc`;

        if (limit) {
            params.push((parseInt(limit, 10)))
            query += ` LIMIT $${params.length}`;
        }

        const {rows} = await pool.query(query, params);
        res.json(rows);
    } catch (err) {
        console.error("Error fetching bookings list:", err);
        res.status(500).json({ error: "Server error" });
    }
})

router.post('/', async (req, res) => {
    try {
        const {
            itemType,
            itemId
        } = req.body;

        if (!TYPES.includes(itemType) || !itemId) return res.status(400).json({error: "itemType and itemId are required"});

        const {rows} = await pool.query(`
            insert into favorites (user_id, item_type, item_id)
            values ($1, $2, $3)
            on conflict (user_id, item_type, item_id) do nothing
            returning *`,
            [req.user.id, itemType, String(itemId)],
        );

        if (rows.length === 0) return res.status(200).json({message: "Already in favorites"});

        res.status(201).json(rows[0]);
    } catch (err) {
        console.error("Error creating booking:", err);
        res.status(500).json({ error: "Server error" });
    }
})

router.delete('/:type/:itemId', async (req, res) => {
    try {
        const { type, itemId } = req.params;

        if (!TYPES.includes(type)) return res.status(400).json({ error: "Invalid type" });

        const result = await pool.query(
            `delete from favorites where user_id = $1 and item_type = $2 and item_id = $3`,
            [req.user.id, type, String(itemId)]
        );

        if (result.rowCount === 0) return res.status(404).json({ error: "Favorite not found" });

        res.json({ ok: true });
    } catch (err) {
        console.error("Error deleting favorite:", err);
        res.status(500).json({ error: "Server error" });
    }
})

export default router;