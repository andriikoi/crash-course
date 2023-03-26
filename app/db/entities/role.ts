import _Sequelize, { DataTypes, Sequelize } from 'sequelize';

const defineRoleModel = (sequelize: Sequelize) => sequelize.define('Role', {
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

export default defineRoleModel;
