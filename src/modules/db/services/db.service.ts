import {Pool} from "pg";
import {generalConfig} from "../../config/general";

class DbService {
    private client: any;
    public pool: Pool;
    constructor() {
        this.pool = new Pool({
            user: generalConfig.env.DB_USER,
            host: generalConfig.env.DB_URI,
            database: generalConfig.env.DB_NAME,
            password: generalConfig.env.DB_PASS,
            port: generalConfig.env.DB_PORT,
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
    DbService,
}
