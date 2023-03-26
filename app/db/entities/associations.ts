import { ModelStatic } from 'sequelize';

const defineAssociations = (entities: Record<string, ModelStatic<any>>): void => {
    const {
        File,
        Like,
        Post,
        Role,
        Tag,
        User
    } = entities;

    File.belongsToMany(Post, {
        through: "post_file",
        as: "posts",
        foreignKey: "fileId",
    });

    Like.belongsTo(Post);
    Like.belongsTo(User);

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

    Role.belongsToMany(User, {
        as: 'users',
        through: 'user_role',
        foreignKey: 'roleId',
    });

    Tag.belongsToMany(Post, {
        through: "post_tag",
        as: "posts",
        foreignKey: "tagId",
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
}

export default defineAssociations;
