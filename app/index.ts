import express, { Express, Router } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const rootRouter = Router();
rootRouter.use('/api', routes);
app.use(rootRouter);

app.listen(port, () => {
    console.log(`Crash course app listening on port ${port}`);
});

module.exports = {};
