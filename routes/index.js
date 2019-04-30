const routes = {}
module.exports = (app,upload) => {
    const services = require('../services/index.js');
    routes.users = require('./user.js')(app,upload,services);
    routes.images = require('./image.js')(app,upload,services);
    return routes;
}