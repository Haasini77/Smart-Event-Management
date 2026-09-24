import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes";
import registrationRoutes from "./routes/registrationRoutes";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);

app.use("/api/events", eventRoutes);

app.use("/api/registrations", registrationRoutes);

app.get("/", (_req, res) => {
  res.json({
    message: "EventHub Backend is running successfully!",
  });
});

app.listen(PORT, () => {
  console.log(
    `EventHub backend running on http://localhost:${PORT}`
  );
});