const env = require('../bin/env.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    baseUrl:env.baseUrl,
    dialect: env.dialect,
    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
})
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require('../model/user.js')(sequelize, Sequelize);
db.Image = require('../model/image.js')(sequelize, Sequelize);
if (db.User.associate) {
    db.User.associate(db);
}
if (db.Image.associate) {
    db.Image.associate(db);
}
module.exports = db;