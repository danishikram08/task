const env = {
    database: 'task',
    username: 'root',
    password: '',
    host: 'localhost',
    baseUrl: 'http://localhost:3000',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 1000
    },
    secret: "wowwow"
}
module.exports = env;