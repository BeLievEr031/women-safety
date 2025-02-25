import express from "express"
import cors from "cors"
import contactRouter from "./routes/contactRouter";

const app = express();

app.use(express.json({ limit: "1MB" }))
app.use(express.urlencoded({ extended: true, limit: "1MB" }))
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173"]
}))


app.use("/api/v1/contact", contactRouter)
export default app;