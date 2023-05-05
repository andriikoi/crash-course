import { BadRequestException, UnauthorizedException } from '../helpers/errors';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import db from '../db';
import omit from 'lodash/omit';
import { IUser } from '../db/entities/user';

interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
}

const { User } = db.entities;

const USER_VISIBLE_FIELDS = ['id', 'firstName', 'lastName', 'username', 'email', 'avatar', 'followerId', 'about'];

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
            throw new BadRequestException(400, 'User already exists');
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

    public async update(id: string, body: Partial<IUser>): Promise<IUser> {
        try {
            const result = await User.update(body,
                { where: { id },
                    returning: USER_VISIBLE_FIELDS,
                    plain: true,
                });
            return result[1];
        } catch (e) {
            throw new BadRequestException(400, 'Can\'t update user profile');
        }
    }

    public async findOne(id: string): Promise<IUser> {
        const user = await User.findByPk(id, { attributes: USER_VISIBLE_FIELDS });

        if (!user) {
            throw new BadRequestException(404, 'User not found');
        }

        return user;
    }
}

export default UserModel;
