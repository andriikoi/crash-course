import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
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
    const { accessToken } = req.cookies;

    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
        console.log('Error: missing JWT_SECRET in env');
        res.status(500).send('Something went wrong');
        return;
    }

    if (!accessToken) {
        res.status(401).send('Access token is missing');
        return;
    }

    jwt.verify(accessToken, secretKey, (err: VerifyErrors | null, user?: JwtPayload | string) => {
        if (err) {
            return res.status(401).send('Access token is invalid or has expired');
        }

        req.user = user as IUser;
        next();
    });
}

export default verifyJwt;
