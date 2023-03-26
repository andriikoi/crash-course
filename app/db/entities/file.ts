import _Sequelize, { DataTypes, Sequelize } from 'sequelize';

const defineFileModel = (sequelize: Sequelize) => sequelize.define('File', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: _Sequelize.UUIDV4,
        allowNull: false,
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

export default defineFileModel;
