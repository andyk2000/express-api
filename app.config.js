const Pool = require("pg").Pool
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