const Pool = require('pg').Pool;
const db = new Pool({
    database: 'students',
    user: 'students_app',
    password: '123',
    host: 'localhost', 
    port: 5434
});

module.exports = db;