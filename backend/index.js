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

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length === 0) {
            return res
              .status(400)
              .json({ message: "Invalid email or password." });
        }

        const user = userCheck.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
              .status(400)
              .json({ message: "Invalid email or password." });
        }

        res.status(200).json({
          message: "Login successful.",
            user: {
              id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                phone: user.phone_number,
            }
        });
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).json({message: 'Server error'})
    }
})

app.get('/', (req, res) => {
    res.send('API сервера работает!');
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});