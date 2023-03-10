import { DataTypes } from 'sequelize';
import { v1 as uuid } from 'uuid';
import connection from '../index';
import User from './user';

const Role = connection.define('Role', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: uuid,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Role.belongsToMany(User, {
    as: 'users',
    through: 'user_role',
    foreignKey: 'roleId',
});

export default Role;
