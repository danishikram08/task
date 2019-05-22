const bcrypt = require('bcrypt');
module.exports = (sequelize, datatype) => {
    const User = sequelize.define('User', {
        id: {
            type: datatype.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: datatype.STRING
        },
        email: {
            type: datatype.STRING
        },
        password: {
            type: datatype.STRING
        },

        token: {
            type: datatype.STRING,
            allowNull: true
        }
    });

    User.associate = (model) => {
        User.hasMany(model.Image);
    }
    return User;
}