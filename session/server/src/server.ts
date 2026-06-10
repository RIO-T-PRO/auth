import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "@/routers/auth.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json);

app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log("Server listening on PORT", PORT));
