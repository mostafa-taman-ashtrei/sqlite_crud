require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const { createPost } = require('./posts');

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
    app.use(morgan('combined', { stream: accessLogStream }));
}

app.post('/create', async (req, res) => {
    const { title, body } = req.body;

    if (title === '') return res.json({ Error: 'The title is required' });
    if (body === '') return res.json({ Error: 'The body is required' });

    try {
        const data = {
            title: title.trim(),
            body: body.trim(),
        };
        const result = await createPost(data);
        return res.status(201).json({ id: result[0] });
    } catch (e) {
        console.log(e);
    }
});

app.listen(port, () => console.log(`Server is running on port ${port}...`));
