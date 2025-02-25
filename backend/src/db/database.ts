import { Sequelize } from "sequelize";
import logger from "../config/logger";

export const sequelize = new Sequelize("safety", "root", "root", {
    host: "localhost",
    dialect: "mysql", // Use "postgres" for PostgreSQL
    logging: false, // Disable query logs
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        logger.info("✅ Database connected successfully.");
        await sequelize.sync({ alter: true }); // Syncs the models with DB
    } catch (error) {
        logger.error("❌ Database connection failed:", error);
        process.exit(1);
    }
};
