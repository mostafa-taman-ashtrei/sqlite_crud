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

router.post('/update', async (req, res) => {
    const { id, title, body } = req.body;

    if (id === '') return res.status(400).json({ Error: 'The id is required' });
    if (title === '') return res.status(400).json({ Error: 'The title is required' });
    if (body === '') return res.status(400).json({ Error: 'The body is required' });

    try {
        const newPost = await conn('posts').where('id', id).update({ title, body });
        if (newPost === 0) return res.status(404).json({ msg: 'Post not found ...' });
        return res.status(200).json({ msg: 'Post updated' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ Error: 'A Server error occured ...' });
    }
});

router.post('/del', async (req, res) => {
    const { id } = req.body;
    if (id === '') return res.status(400).json({ Error: 'The id is required' });

    try {
        const delPost = await conn('posts').where('id', id).del();
        if (delPost === 0) return res.status(404).json({ msg: 'Post not found ...' });
        return res.status(200).json({ msg: 'Post deleted ...' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ Error: 'A Server error occured ...' });
    }
});

module.exports = router;
