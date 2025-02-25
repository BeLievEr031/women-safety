import express from "express"
import cors from "cors"

const app = express();

app.use(express.json({ limit: "1MB" }))
app.use(express.urlencoded({ extended: true, limit: "1MB" }))
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173"]
}))


export default app;