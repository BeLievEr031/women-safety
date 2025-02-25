import Config from "./config/Config";
import logger from "./config/logger";
import { connectDB } from "./db/database";
import app from "./server";


connectDB().then(() => {
    app.listen(Config.PORT!, () => {
        logger.info("Connected to server at ", Config.PORT)
    })
}).catch((error) => {
    logger.error(error)
    process.exit(1)
})