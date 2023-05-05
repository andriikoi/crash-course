import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../db/entities/user';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            user: { id: string };
        }
    }
}

const verifyJwt = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
        console.log('Error: missing JWT_SECRET in env');
        res.status(500).send('Something went wrong');
        return;
    }

    if (!token) {
        res.status(401).send('Access token is missing');
        return;
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(401).send('Access token is invalid or has expired');
        }

        req.user = user as IUser;
        next();
    });
}

export default verifyJwt;
