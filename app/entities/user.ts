import { DataTypes } from 'sequelize';
import { v1 as uuid } from 'uuid';
import connection from '../index';
import Role from './role';
import File from './file';
import Post from './post';

const User = connection.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: uuid,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    avatar: {
        type: DataTypes.UUID,
        references: {
            model: 'File',
            key: 'id'
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    about: {
        type: DataTypes.STRING,
    },
});

User.hasMany(User, {
    as: 'followers',
    foreignKey: 'followerId'
});

User.belongsToMany(User, {
    as: 'following',
    through: 'follower_user',
    foreignKey: 'userId',
    otherKey: 'followerId'
});

User.belongsToMany(Role, {
    as: 'roles',
    through: 'user_role',
    foreignKey: 'userId',
});

User.hasMany(Post, {
    as: 'posts',
    foreignKey: 'userId'
});

export default User;
