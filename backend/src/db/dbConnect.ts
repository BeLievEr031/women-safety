import mysql from "mysql2";
// import logger from "../config/logger";

// const dbConnect = async () => {
//     try {
//         mongoose.connection.on("connected", () => {
//             logger.info("Connected to db!")
//         })

//         mongoose.connection.on("error", (err) => {
//             logger.error("Error while connecting to db! ", err)
//         })

//         mongoose.connection.on("disconnected", () => {
//             logger.info("db disconnected!")
//         })

//         await mongoose.connect(Config.DB_URI!)

//     } catch (error) {
//         logger.error(error)
//         process.exit(1)
//     }
// }


const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "safety",
    connectionLimit: 10,
});

export default pool;

