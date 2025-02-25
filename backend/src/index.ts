import Config from "./config/Config";
import logger from "./config/logger";
import dbConnect from "./db/dbConnect";
import app from "./server";


dbConnect().then(() => {
    app.listen(Config.PORT!, () => {
        logger.info("Connected to server at ", Config.PORT)
    })
}).catch((error) => {
    logger.error(error)
    process.exit(1)
})