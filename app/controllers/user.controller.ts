import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import { NotFoundException, sendErrorResponse } from '../helpers/errors';
import { validate as validateUuid } from 'uuid';

class UserController {
    private model: UserModel;

    constructor() {
        this.model = new UserModel();
    }

    public login = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { username, password } = req.body || {};
            const result = await this.model.login(username, password);
            res.cookie('accessToken', result.accessToken, { domain: '/' });
            res.cookie('refreshToken', result.refreshToken, { domain: '/' });
            return res.send(result);
        } catch (e) {
            return sendErrorResponse(res, e);
        }
    }

    public register = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { username, email, password } = req.body;
            const result = await this.model.register(username, email, password);
            return res.status(201).send(result);
        } catch (e) {
            return sendErrorResponse(res, e);
        }
    }

    public delete = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;

            if (!validateUuid(id)) {
                return sendErrorResponse(res, new NotFoundException('User not found'));
            }

            const result = await this.model.delete(id);
            return res.status(204).send(result);
        } catch (e) {
            return sendErrorResponse(res, e);
        }
    }

    public updateMe = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { user: { id }, body } = req;
            const result = await this.model.update(id, body);
            return res.status(200).send(result);
        } catch (e) {
            return sendErrorResponse(res, e);
        }
    }

    public getMe = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { user: { id } } = req;
            const result = await this.model.findOne(id);
            return res.status(200).send(result);
        } catch (e) {
            return sendErrorResponse(res, e);
        }
    }
}

export default new UserController();
