import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js"
import userRouts from "./routes/user.route.js"
import docorRoutes from "./routes/doctor.route.js"
import reviewRoutes from "./routes/review.route.js"


const app = express();

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
}))

// Using json to handel midllewres
app.use(express.json({ limit : "24kb"}))
app.use(express.urlencoded({ extended :true, limit : "24kb" }))
app.use(cookieParser())

// Server => http://localhost:3000/api/v1/

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/user", userRouts)
app.use("/api/v1/doctor", docorRoutes)
app.use("/api/v1/reviews", reviewRoutes)




export {app}