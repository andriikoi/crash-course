import { Express } from 'express';
import initHealthcheckController from './healthcheckController';

const initControllers = (app: Express) => {
    initHealthcheckController(app);
}

export default initControllers;
