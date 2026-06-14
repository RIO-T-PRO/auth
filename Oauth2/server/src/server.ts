import express from "express";
import authRoutes from "@/routes/auth.js";
import { env } from "./config/env.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (_, res) => {
  res.json({ message: "OAuth demo server is running" });
});

app.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT}`);
});
