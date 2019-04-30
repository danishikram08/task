const app = require('../app.js');
const server = app.listen(3000, () => {
    const port = server.address().port;
    console.log("App listening at", port);
})