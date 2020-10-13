import {Pool} from "pg";
import {generalConfig} from "../../config/general";
import {pool} from "../index";

class DBService {
    private client: any;
    private pool: Pool;
    constructor() {
        this.pool = new Pool({
            user: generalConfig.env.DB_USER,
            host: generalConfig.env.DB_URI,
            database: generalConfig.env.DB_NAME,
            password: generalConfig.env.DB_PASS,
            port: generalConfig.env.DB_PORT,
        });

        pool.on("connect", () => {
            console.log("connected to the Database");
        });
    }
    public async connect() {
        this.client = await this.pool.connect();
    }
    public getClient() {
        return this.client;
    }
}

export {
    DBService,
}
