import _Sequelize, { DataTypes, Sequelize } from 'sequelize';

const definePostModel = (sequelize: Sequelize) => sequelize.define('Post', {
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
    text: {
        type: DataTypes.STRING,
    },
});

export default definePostModel;
