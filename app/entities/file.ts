import connection from '../index';
import { DataTypes } from 'sequelize';
import { v1 as uuid } from 'uuid';
import Post from './post';

const File = connection.define('File', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: uuid,
        allowNull: false,
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

File.belongsToMany(Post, {
    through: "post_file",
    as: "posts",
    foreignKey: "fileId",
});

export default File;
