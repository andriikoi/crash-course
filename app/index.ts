import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import db from './db';
import initControllers from './controllers';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const connection = db.connect();

initControllers(app, connection);

app.get('/', (req: Request, res: Response) => {
    res.send('Full stack crash course');
});

app.listen(port, () => {
    console.log(`Crash course app listening on port ${port}`);
});
