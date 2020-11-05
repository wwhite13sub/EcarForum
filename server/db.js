const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    multipleStatements: true
});

connection.connect(function(err) {
    if (err) {
        throw err;
    }
    console.log('connected successfully');
});

module.exports = connection;