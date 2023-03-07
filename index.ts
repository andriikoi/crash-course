import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Full stack crash course');
});

app.listen(port, () => {
    console.log(`Crash course app listening on port ${port}`)
})
