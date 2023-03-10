import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { checkConnection } from './db';
import initControllers from './controllers';
import { Sequelize } from 'sequelize';

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

initControllers(app, connection);

app.get('/', (req: Request, res: Response) => {
    res.send('Full stack crash course');
});

app.listen(port, () => {
    console.log(`Crash course app listening on port ${port}`);
});

export default connection;
