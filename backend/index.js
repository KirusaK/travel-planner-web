import express from "express";
import cors from "cors";
import dotenv, {parse} from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import cardsRoutes from "./routes/cards.routes.js";
import bookingsRoutes from "./routes/bookings.routes.js";
import flightsRoutes from "./routes/flights.routes.js";
import hotelsRoutes from "./routes/hotels.routes.js";
import adminsRoutes from "./routes/admins.routes.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/admins", adminsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cards", cardsRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/flights", flightsRoutes);
app.use("/api/hotels", hotelsRoutes);

app.get("/", (req, res) => {
  res.send("API сервера работает!");
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
