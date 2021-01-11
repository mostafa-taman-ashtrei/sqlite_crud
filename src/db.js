const knex = require('knex');

const conn = knex({
    client: 'sqlite3',
    connection: {
        filename: './data.db',
    },
    useNullAsDefault: true,
});

module.exports = conn;
