import { Express } from 'express';
import { Sequelize } from 'sequelize';
import initHealthcheckController from './healthcheckController';

const initControllers = (app: Express, connection: Sequelize) => {
    initHealthcheckController(app, connection);
}

export default initControllers;
