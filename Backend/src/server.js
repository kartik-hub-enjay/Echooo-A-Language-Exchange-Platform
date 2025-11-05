import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import chatRouter from "./routes/chatRoute.js";
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const app = express();

// CORS configuration - allow both local and production origins
const allowedOrigins = [
    "http://localhost:5173",
    "https://echooo-xiib.onrender.com"
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(null, true); // For now, allow all origins during development
        }
    },
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

// API Routes
app.use("/api/auth",authRouter);
app.use("/api/users",userRouter);
app.use("/api/chat",chatRouter);

// Serve static files from Frontend dist folder in production
if (process.env.NODE_ENV === "production") {
    const frontendDistPath = path.join(__dirname, "../../Frontend/dist");
    app.use(express.static(frontendDistPath));

    // Handle React routing - return index.html for all non-API routes
    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendDistPath, "index.html"));
    });
}

app.listen(PORT,()=>{
    console.log(`server started on port: ${PORT}`);
    connectDB();
})