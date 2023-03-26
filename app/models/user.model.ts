import { BadRequestException, UnauthorizedException } from '../helpers/errors';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import db from '../db';
import omit from 'lodash/omit';

interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
}

const { User } = db.entities;

class UserModel {
    public async login(username: string, password: string): Promise<ILoginResponse> {
        if (!username || !password) {
            throw new UnauthorizedException(401, 'Invalid username or password');
        }

        const user = await User.findOne({ where: { username } });

        if (!user) {
            throw new UnauthorizedException(401, 'Invalid username or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException(401, 'Invalid username or password');
        }

        const accessToken = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET || 'jwt_secret',
            { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: user.id },
            process.env.JWT_REFRESH_SECRET || 'jwt_refresh_secret',
            { expiresIn: '30d' });

        user.refreshToken = refreshToken;

        await user.save();

        return {
            accessToken,
            refreshToken
        }
    }

    public async register(username: string, email: string, password: string): Promise<typeof User> {
        const user = await User.findOne({ where: { [Op.or]: [{ username }, { email }]} });

        if (user) {
            throw new BadRequestException(409, 'User already exists');
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const { dataValues: createdUser } = await User.create({ username, email, password: passwordHash });

        return omit(createdUser, ['password']);
    }

    public async delete(id: string): Promise<{ message: string }> {
        const user = await User.findByPk(id);

        if (!user) {
            throw new BadRequestException(404, 'User not found');
        }

        return user.destroy();
    }
}

export default UserModel;
