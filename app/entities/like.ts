import { DataTypes } from 'sequelize';
import { v1 as uuid } from 'uuid';
import connection from '../index';
import Post from './post';
import User from './user';

const Like = connection.define('Like', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: uuid,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
    },
    postId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'posts',
            key: 'id'
        },
    },
});

Like.belongsTo(Post);
Like.belongsTo(User);

export default Like;
