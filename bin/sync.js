const db = require('../model/index.js');
db.sequelize.sync({
    force: true
}).then(() => {
    console.log('Drop and Resync with {force: true}')
})