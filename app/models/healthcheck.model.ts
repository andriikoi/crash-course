import { checkConnection } from '../db';
import db from '../db';

class HealthcheckModel {
    public check(): Promise<boolean> {
        return checkConnection(db.sequelize);
    }
}

export default HealthcheckModel;
