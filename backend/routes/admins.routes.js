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

function requireSuperAdmin(req, res, next) {
    if (req.user?.role !== "super_admin") {
        return res.status(403).json({error: "Access denied. Only Super Admin can update admins."});
    }
    next();
}

function validateAdmin(
    {firstName, lastName, email, role, password},
    {passwordRequired = true} = {},
) {
    if (!firstName?.trim() || !lastName?.trim() || !email?.includes("@")) {
        return "First name, last name and a valid email are required";
    }
    if (passwordRequired && !password) return "Password is required";
    if (password && password.length < 8) return "Password must be at least 8 characters";
    if (role && !admin_Roles.includes(role)) return "Invalid role";
    return null;
}

router.get("/", async (req, res) => {
    try {
        const {rows} = await pool.query(`
            select ${admin_Field} from users
            where role in ('admin', 'super_admin')
            order by id
        `);

        res.json(rows);
    } catch (err) {
        console.error("Error fetching admins:", err);
        res.status(500).json({error: "Server Error"});
    }
});

router.post("/", requireSuperAdmin, async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        role = "admin",
        password
    } = req.body;

    const validateError = validateAdmin({firstName, lastName, email, role, password});
    if (validateError) return res.status(400).json({error: validateError});

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
        if (err.code === "23505") {
            return res.status(409).json({error: "Email already in use"});
        }

        console.error("Error creating admin:", err);
        res.status(500).json({error: "Server Error"});
    }
})

router.put("/:id", requireSuperAdmin, async (req, res) => {
    const {id} = req.params;

    if (!/^\d+$/.test(id)) {
        return res.status(400).json({error: "Invalid id"});
    }

    const {
        firstName,
        lastName,
        email,
        role = "admin",
        password
    } = req.body;

    const validateError = validateAdmin({firstName, lastName, email, role, password}, {passwordRequired: false});
    if (validateError) return res.status(400).json({error: validateError});

    try {
        const checkAdmin = await pool.query(`select from users where id = $1 and role in ('admin', 'super_admin')`, [id])
        if (checkAdmin.rows.length === 0) {
            return res.status(404).json({error: "Admin not found."});
        }

        let query, values;
        if (password && password.trim() !== "") {
            if (password.length < 8) {
                return res.status(400).json({error: "Password must be at least 8 characters"});
            }

            const passwordHash = await bcrypt.hash(password, 10);

            query = `
            update users 
            set first_name = $1, last_name = $2, email = $3, role = $4, password = $5
            where id = $6
            returning ${admin_Field}
            `;

            values = [firstName.trim(), lastName.trim(), email.trim(), role, passwordHash, id];
        } else {
            query = `
            update users 
            set first_name = $1, last_name = $2, email = $3, role = $4
            where id = $5
            returning ${admin_Field}
            `;

            values = [firstName.trim(), lastName.trim(), email.trim(), role, id];
        }

        const {rows} =await pool.query(query, values);
        res.json(rows[0]);
    } catch (err) {
        if (err.code === "23505") {
            return res.status(409).json({error: "Email already in use"});
        }

        console.error("Error updating admin:", err);
        res.status(500).json({error: "Server Error"});
    }
})

router.delete("/:id", requireSuperAdmin, async (req, res) => {
    const {id} = req.params;

    if (!/^\d+$/.test(id)) {
        return res.status(400).json({error: "Invalid id"});
    }



    try {
        const result = await pool.query(
            `delete from users where id = $1 and role in ('admin', 'super_admin')`,
            [id],
        );

        if (result.rowCount === 0) {
            return res.status(404).json({error: "Admin not found."});
        }

        res.json({message: "Admin deleted successfully.", id});
    } catch (err) {
        if (err.code === "23503") {
            return res.status(409).json({
                error: "This account has related records (bookings or cards).",
            });
        }
        console.error("Error deleting admin:", err);
        res.status(500).json({error: "Server Error"});
    }
});

export default router;