require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const { createDb } = require('./config/db');
const postRoutes = require('./routes/postRoutes');

(async () => {
    const app = express();
    const port = process.env.PORT || 5000;

    await createDb();

    app.use(morgan('dev'));
    app.use(helmet());
    app.use(express.json());

    if (process.env.NODE_ENV === 'production') {
        const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
        app.use(morgan('combined', { stream: accessLogStream }));
    }

    app.use('/posts', postRoutes);

    app.listen(port, () => console.log(`Server is running on port ${port}...`));
})();
