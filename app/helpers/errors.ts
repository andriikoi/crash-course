import { Response } from 'express';

export class UnauthorizedException extends Error {
    code: number;

    constructor(code = 401, message = 'Unauthorized') {
        super(message);
        this.code = code;
    }
}

export class BadRequestException extends Error {
    code: number;

    constructor(code = 400, message = 'You sent incorrect data') {
        super(message);
        this.code = code;
    }
}

export class NotFoundException extends Error {
    code = 404;

    constructor(message = 'Not found') {
        super(message);
    }
}

export const sendErrorResponse = (res: Response, error: any) => {
    if (error.code) {
        return res.status(error.code).send({ code: error.code, message: error.message });
    }
    return res.status(500).send({ code: 500, message: 'Something went wrong' });
}
