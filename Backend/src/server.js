import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import chatRouter from "./routes/chatRoute.js";
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
dotenv.config();

const PORT = process.env.PORT;
const app = express();

const __dirname = path.resolve();

app.use(cors({
    origin:  "http://localhost:5173",
    credentials: true, // allow frontend to send cookies
}))

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/users",userRouter);
app.use("/api/chat",chatRouter);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}

app.listen(PORT,()=>{
    console.log(`server started on port: ${PORT}`);
    connectDB();
})