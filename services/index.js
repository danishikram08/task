const db = require('../model/index.js');
module.exports = {
    User: require('./user.js')(db),
    Image: require('./image.js')(db)
}