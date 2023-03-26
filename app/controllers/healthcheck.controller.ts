import { Request, Response } from 'express';
import HealthcheckModel from '../models/healthcheck.model';

class HealthcheckController {
    private model: HealthcheckModel;

    constructor() {
        this.model = new HealthcheckModel();
    }

    public check = async (req: Request, res: Response): Promise<Response> => {
        const status = await this.model.check();
        return res.send({ db: status });
    }
}

export default new HealthcheckController();
