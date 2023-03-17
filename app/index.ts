import express, { Express } from 'express';
import dotenv from 'dotenv';
import { checkConnection } from './db';
import { Sequelize } from 'sequelize';
import rootRouter from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const DB_NAME = process.env.POSTGRES_DB || 'db';
const USER = process.env.POSTGRES_USER || 'user';
const PASSWORD = process.env.POSTGRES_PASSWORD || 'password';

const connection = new Sequelize(DB_NAME, USER, PASSWORD, {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    dialect: 'postgres'
});

checkConnection(connection)
    .then((result: boolean) => result && console.log('Connection has been established successfully.'));

app.use(rootRouter);

app.listen(port, () => {
    console.log(`Crash course app listening on port ${port}`);
});

export default connection;
