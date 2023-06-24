import express, { Express, Router } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import cors from 'cors';
import cookies from 'cookie-parser';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL || 'http://localhost:9000'
}));
app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const rootRouter = Router();
rootRouter.use('/api', routes);
app.use(rootRouter);

app.listen(port, () => {
    console.log(`Crash course app listening on port ${port}`);
});

module.exports = {};
