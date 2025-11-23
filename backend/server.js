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
const defaultOrigins = [
  "http://localhost:3000",
  "https://neotisa.com",
  "https://www.neotisa.com",
];

// Add Vercel preview/production URLs if provided
const vercelUrl = process.env.VERCEL_URL;
const configuredOrigin = process.env.FRONTEND_URL;

const allowedOrigins = [
  ...defaultOrigins,
  ...(configuredOrigin ? [configuredOrigin] : []),
  ...(vercelUrl ? [`https://${vercelUrl}`] : []),
].filter((v, i, a) => a.indexOf(v) === i); // deduplicate

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow non-browser tools
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
  })
);

console.log("CORS configured to accept requests from:", allowedOrigins);

// API endpoint
app.get("/", (req, res) => res.send("api is working"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => console.log(`Server started on PORT${port}`));
