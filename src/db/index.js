const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "c-universe",
    password: "",
    port: 54320
});

module.exports = pool;
