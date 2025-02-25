import mongoose from "mongoose";
import logger from "../config/logger";
import Config from "../config/Config";

const dbConnect = async () => {
    try {
        mongoose.connection.on("connected", () => {
            logger.info("Connected to db!")
        })

        mongoose.connection.on("error", (err) => {
            logger.error("Error while connecting to db! ", err)
        })

        mongoose.connection.on("disconnected", () => {
            logger.info("db disconnected!")
        })

        await mongoose.connect(Config.DB_URI!)

    } catch (error) {
        logger.error(error)
        process.exit(1)
    }
}

export default dbConnect;