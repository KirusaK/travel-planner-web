import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { pool } from "./db/db.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API сервера работает!');
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});