//                                                                                      //
///// Здесь все запросы которые связанные с авторизацией и регистрацией пользователя /////
//                                                                                      //

import {Router} from 'express';
import {pool} from '../db/db.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();


router.post("/register", async (req, res) => {
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

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({message: "Email and password are required."})
        }

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

        if (!user.is_active) {
            return res.status(403).json({message: "This account is disabled."})
        }

        const token = jwt.sign(
            {id: user.id, email: user.email, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                phone: user.phone_number,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("Error during login:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;