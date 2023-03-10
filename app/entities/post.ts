import connection from '../index';
import { DataTypes } from 'sequelize';
import { v1 as uuid } from 'uuid';
import File from './file';
import Tag from './tag';

const Post = connection.define('Post', {
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
    text: {
        type: DataTypes.STRING,
    },
});

Post.belongsToMany(Tag, {
    through: "post_tag",
    as: "tags",
    foreignKey: "postId",
});

Post.belongsToMany(File, {
    through: "post_file",
    as: "files",
    foreignKey: "postId",
});

export default Post;
