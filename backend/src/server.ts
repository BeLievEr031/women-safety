import express from "express"
import cors from "cors"
import contactRouter from "./routes/contactRouter";
import alertRouter from "./routes/alertRouter";
import reportIncidentRouter from "./routes/reportIncidentRouter";
import dangerZoneRouter from "./routes/dangerZoneRouter";

const app = express();

app.use(express.json({ limit: "1MB" }))
app.use(express.urlencoded({ extended: true, limit: "1MB" }))
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173"]
}))


app.use("/api/v1/contact", contactRouter)
app.use("/api/v1/alert", alertRouter)
app.use("/api/v1/report-incident", reportIncidentRouter)
app.use("/api/v1/danger-zone", dangerZoneRouter)
export default app;