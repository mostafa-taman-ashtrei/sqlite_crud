module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        'no-console': 'off',
        indent: ['error', 4],
    },
};
