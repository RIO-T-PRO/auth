import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "@/routes/auth.routes.js";
import { env } from "@/config/env.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "Google OIDC demo server is running" });
});

app.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT}`);
});
