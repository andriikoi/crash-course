import _Sequelize, { DataTypes, Model, Sequelize } from 'sequelize';

export interface IUser {
    id: string;
    email: string;
    avatar?: string;
    firstName?: string;
    lastName?: string;
    username: string;
    password: string;
    followerId?: string;
    refreshToken?: string;
    about?: string;
}

interface UserModel extends Model<IUser>, IUser {}

const defineUserModel = (sequelize: Sequelize) => sequelize.define<UserModel>('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: _Sequelize.UUIDV4,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    avatar: {
        type: DataTypes.STRING,
    },
    followerId: {
        type: DataTypes.UUID,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    refreshToken: {
        type: DataTypes.STRING,
    },
    about: {
        type: DataTypes.STRING,
    },
}, { tableName: 'users' });

export default defineUserModel;
