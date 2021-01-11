const conn = require('./db');

const createPost = (post) => {
    console.log(post);
    return conn('posts').insert(post);
};

module.exports = {
    createPost,
};
