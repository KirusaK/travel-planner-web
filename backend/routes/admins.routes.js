//                                                      //
///// Здесь все запросы которые связанные с Админами /////
//                                                      //

import {Router} from 'express';
import {pool} from '../db/db.js'
import bcrypt from 'bcrypt';

const router = Router();

const admin_Roles = ["admin", "super_admin"];
const admin_Field = `
    id, 
    first_name as "firstName",
    last_name as "lastName",
    email,
    role,
    is_active as "isActive"
`;

router.get("/", async (req, res) => {
    try {
        const {rows} = await pool.query(`
            select ${admin_Field} from users
            where role in ('admin', 'super_admin')
            order by id
        `);

        res.json({rows});
    } catch (err) {
        console.error("Error fetching admins:", err);
        res.status(500).json({error: "Server Error"});
    }
});

router.post("/", async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        role = "admin",
        password
    } = req.body;

    if (!firstName?.trim() || !lastName?.trim() || !email?.includes("@") || !password || password.length < 8) {
        return res.status(400).json({error: "First name, last name, valid email and password (min 8 characters) are required"});
    }

    if (!admin_Roles.includes(role)) {
        return res.status(400).json({error: "Invalid role"});
    }

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const {rows} = await pool.query(`
            insert into users (first_name, last_name, email, role, password) 
            VALUES ($1, $2, $3, $4, $5)
            returning ${admin_Field}`,
            [firstName.trim(), lastName.trim(), email.trim(), role, passwordHash]
        );

        res.status(201).json(rows[0]);
    } catch (err) {
        if (err.code === 23505) {
            return res.status(409).json({error: "Email already in use"});
        }

        console.error("Error creating admin:", err);
        res.status(500).json({error: "Server Error"});
    }
})

export default router;