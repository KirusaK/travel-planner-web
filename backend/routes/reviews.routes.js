//                                                     //
///// Здесь все запросы которые связанные с отзывами /////
//                                                     //

import {Router} from 'express';
import {pool} from '../db/db.js'
import {verifyToken} from "../middleware/auth.middleware.js";

const router = Router();
const tables = {flight: "flights", hotel: "hotels"};

router.get('/', async (req, res) => {
    try {
        const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 5, 1), 20);

        const {rows} = await pool.query(`
            select r.id,
                    r.item_type as "itemType",
                    r.item_id as "itemId",
                    r.author_name as "authorName",
                    r.rating::float as rating,
                    r.text,
                    to_char(r.created_at, 'DD.MM.YYYY') as date,
                    coalesce(f.airline_name, h.name) as "itemTitle"
             from reviews r
             left join flights f on r.item_type = 'flight' and f.id = r.item_id
             left join hotels h on r.item_type = 'hotel' and h.id = r.item_id
             order by r.created_at desc, r.id desc
             limit $1`,
            [limit],
        );

        res.json(rows);
    } catch (err) {
        console.error("Error fetching reviews:", err);
        res.status(500).json({error: "Server error"});
    }
})

router.post("/", verifyToken, async (req, res) => {
    const {itemType, itemId} = req.body;
    const rating = Number(req.body.rating);
    const text = req.body.text?.trim();

    if (!tables[itemType] || !/^\d+$/.test(String(itemId))) return res.status(400).json({error: "Invalid item"});
    if (!Number.isInteger(rating) || rating < 1 ||rating > 5) return res.status(400).json({error: "Rating must be from 1 to 5"});
    if (!text) return res.status(400).json({error: "Review text is required"});
    if (text.length > 1000) return res.status(400).json({error: "Review is too long"});

    const table = tables[itemType];
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const item = await client.query(`select id from ${table} where id = $1`, [itemId]);

        if (item.rowCount === 0) {
            await client.query("ROLLBACK");
            return res.status(404).json({error: "Item not found"});
        }

        const user = await client.query(`select first_name, last_name from users where id = $1`, [req.user.id]);
        const authorName = `${user.rows[0].first_name} ${user.rows[0].last_name}`.trim();

        const reviews = await client.query(
            `insert into reviews (item_type, item_id, user_id, author_name, rating, text)
             values ($1, $2, $3, $4, $5, $6)
             returning id, author_name as "authorName", avatar_url as "avatarUrl",
                       rating::float as rating, text`,
            [itemType, itemId, req.user.id, authorName, rating, text],
        );

        const stats = await client.query(
            `update ${table}
             set rating = s.avg_rating, reviews_count = s.cnt
             from (select round(avg(rating), 1) as avg_rating, count(*)::int as cnt
                   from reviews where item_type = $1 and item_id = $2) s
             where ${table}.id = $2
             returning ${table}.rating::float as rating, ${table}.reviews_count as "reviewsCount"`,
            [itemType, itemId],
        );

        await client.query("COMMIT");
        res.status(201).json({ review: reviews.rows[0], stats: stats.rows[0] });
    } catch (err) {
        await client.query("ROLLBACK");
        if (err.code === "23505") {
            return res.status(409).json({ error: "You have already reviewed this item" });
        }
        console.error("Error adding review:", err);
        res.status(500).json({ error: "Server error" });
    } finally {
        client.release();
    }
})

export default router;