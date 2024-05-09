import express from "express";
import cors from "cors";
import { router } from "./Routers/user.router.js";
import cookieParser from "cookie-parser";
import { registerUser } from "./controllers/users.controller.js";

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json({ limit: "16kb" })); // Only use JSON body parser if you expect JSON data

// Routes
app.use("/api/v1", router); // Use the router for API versioning
app.post("/api/v1/users/register", registerUser); // Define the registerUser route

export { app };