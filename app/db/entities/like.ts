import _Sequelize, { DataTypes, Sequelize } from 'sequelize';

const defineLikeModel = (sequelize: Sequelize) => sequelize.define('Like', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: _Sequelize.UUIDV4,
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

export default defineLikeModel;
