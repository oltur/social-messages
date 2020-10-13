import { Pool } from "pg";
import {generalConfig} from "../config/general";

const pool = new Pool({
    user: generalConfig.env.DB_USER,
    host: generalConfig.env.DB_URI,
    database: generalConfig.env.DB_NAME,
    password: generalConfig.env.DB_PASS,
    port: generalConfig.env.DB_PORT,
});

pool.on("connect", () => {
    console.log("connected to the Database");
});

export {
    pool,
};
