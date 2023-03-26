module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        '@typescript-eslint/no-var-requires': 'off'
    }
};
