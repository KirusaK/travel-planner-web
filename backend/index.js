import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { pool } from "./db/db.js"
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/auth/register', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;

        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({message: 'A user with this email already exists.'})
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newUser = await pool.query(
            `INSERT INTO users (first_name, last_name, email, phone_number, password) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, first_name, last_name, email, phone_number`,
            [firstName, lastName, email, phone, passwordHash]
        )

        res.status(201).json ({
            message: 'User registered successfully.',
            user: newUser.rows[0]
        })
    } catch (err) {
        console.error('Error during registration:', err.message);
        res.status(500).json({message: 'Server error'})
    }
})

app.get('/', (req, res) => {
    res.send('API сервера работает!');
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});