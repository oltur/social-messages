const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "c-universe",
    password: "",
    port: 54320
});

pool.on('connect', () => {
    console.log('connected to the Database');
});

module.exports = pool;
