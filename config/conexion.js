const {Pool} = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "postgres",
    database: "softjobs",
    allowExitOnIdle: true
});

module.exports = {pool}