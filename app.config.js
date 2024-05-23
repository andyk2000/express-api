const Pool = require("pg").Pool;

const { Client } = require('pg');
module.exports = {
    port: 3000,
    db: new Pool({
        user: "postgres",
        host: "localhost",
        database: "merchant-service",
        password: "Ny@bibuye30",
        port: "5432"
    })
}