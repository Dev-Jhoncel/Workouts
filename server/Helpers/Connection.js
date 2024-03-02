const mysql = require('mysql2')

    const Connection = mysql.createConnection({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    });

module.exports = { Connection }