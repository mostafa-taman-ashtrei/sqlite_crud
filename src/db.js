const knex = require('knex');
const fs = require('fs');

const dbPath = './src/db.sqlite';

const conn = knex({
    client: 'sqlite3',
    connection: {
        filename: dbPath,
    },
    useNullAsDefault: true,
});

const createDb = async () => {
    try {
        if (await fs.existsSync(dbPath)) return;

        await fs.open(dbPath, 'w', (err) => {
            if (err) throw err;
            console.log('Db is created successfully.');
        });

        await conn.schema.createTable('posts', (table) => {
            table.increments('id');
            table.string('title');
            table.string('body');
        });
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

module.exports = {
    conn,
    createDb,
};
