import db from '../db';
import { Sequelize } from 'sequelize';

interface IHealthcheckModel {
    connection?: Sequelize;
}

class HealthcheckModel implements IHealthcheckModel {
    connection: Sequelize;

    constructor(connection: Sequelize) {
        this.connection = connection;
        this.check = this.check.bind(this);
    }

    public check(): Promise<boolean> {
        return db.checkConnection(this.connection);
    }
}

export default HealthcheckModel;
