import _Sequelize, { DataTypes, Sequelize } from 'sequelize';

const defineTagModel = (sequelize: Sequelize) => sequelize.define('Tag', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: _Sequelize.UUIDV4,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default defineTagModel;
