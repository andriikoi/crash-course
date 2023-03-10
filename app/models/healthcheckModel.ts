import { checkConnection } from '../db';
import connection from '../index';

class HealthcheckModel {
    public check(): Promise<boolean> {
        return checkConnection(connection);
    }
}

export default HealthcheckModel;
