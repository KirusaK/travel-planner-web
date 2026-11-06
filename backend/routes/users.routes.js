//                                                           //
///// Здесь все запросы которые связанные с Пользователем /////
//                                                           //

import {Router} from 'express';
import {pool} from '../db/db.js'
import bcrypt from 'bcrypt';

const router = Router();

const PROFILE_SELECT = `
  SELECT id,
         TRIM(first_name || ' ' || last_name) AS name,
         email,
         phone_number AS "phoneNumber",
         to_char(date_of_birth, 'YYYY-MM-DD') AS "dateOfBirth"
  FROM users`;

router.get("/", async (req, res) => {
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
    where u.role = 'user'
    order by u.id desc`);

        res.json(rows);
    } catch (err) {
        console.error("Error fetching users for admin:", err);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/:id", async (req, res) => {
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

router.patch("/:id", async (req, res) => {
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

router.patch("/:id/password", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }

    try {
        const result = await pool.query(`delete from users where id = $1`, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({message: "User deleted successfully", id})
    } catch (err) {
        if (err.code === "23503") {
            return res
                .status(409)
                .json({ error: "Card is used in bookings and cannot be deleted" });
        }

        console.error("Error deleting user:", err);
        res.status(500).json({ error: "Server error" });
    }
})

export default router;