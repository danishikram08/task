const routes = {}
module.exports = (app, upload,CryptoJS,passport,jwt) => {
    const services = require('../services/index.js');
    routes.users = require('./user.js')(app, upload, services,CryptoJS,passport,jwt);
    routes.images = require('./image.js')(app, upload, services);
    return routes;
}