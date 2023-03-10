require('dotenv').config();

const defaultDBConfig = {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    dialect: 'postgres',
}

module.exports = {
    development: defaultDBConfig,
    test: defaultDBConfig,
    production: defaultDBConfig,
};
