import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(cookieParser());
// allow requests from the frontend and allow cookies
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

console.log("CORS configured to accept requests from:", FRONTEND_URL);

// API endpoint
app.get("/", (req, res) => res.send("api is working"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => console.log(`Server started on PORT${port}`));
