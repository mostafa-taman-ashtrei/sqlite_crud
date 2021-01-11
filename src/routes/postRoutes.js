const { Router } = require('express');

const { conn } = require('../db');

const router = new Router();

router.get('/', async (_, res) => {
    const posts = await conn('posts').select('*');
    return res.json({ posts });
});

router.post('/create', async (req, res) => {
    const { title, body } = req.body;

    if (title === '') return res.status(400).json({ Error: 'The title is required' });
    if (body === '') return res.status(400).json({ Error: 'The body is required' });

    try {
        const data = {
            title: title.trim(),
            body: body.trim(),
        };
        const result = await conn('posts').insert(data);
        return res.status(201).json({ id: result[0] });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ Error: 'A Server error occured ...' });
    }
});

module.exports = router;
