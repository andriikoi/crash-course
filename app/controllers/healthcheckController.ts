import { Express, Request, Response, Router } from 'express';
import HealthcheckModel  from '../models/healthcheckModel';

const initHealthcheckController = (app: Express): void => {
    const model = new HealthcheckModel();

    const router = Router();

    router.get('/', async (req: Request, res: Response) => {
        const status = await model.check();
        res.send({ db: status });
    });

    app.use('/healthcheck', router);
}

export default initHealthcheckController;
