import connection from '../index';
import { DataTypes } from 'sequelize';
import { v1 as uuid } from 'uuid';
import Post from './post';

const Tag = connection.define('Tag', {
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

Tag.belongsToMany(Post, {
    through: "post_tag",
    as: "posts",
    foreignKey: "tagId",
});

export default Tag;
