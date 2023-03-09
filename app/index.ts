import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import db from './db';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

db.connect();

app.get('/', (req: Request, res: Response) => {
    res.send('Full stack crash course');
});

app.listen(port, () => {
    console.log(`Crash course app listening on port ${port}`);
});
