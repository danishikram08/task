const express = require('express');
const multer = require('multer');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage
});
const routers = require('./routes')(express, upload);
app.use('/users', routers.users);
app.use('/images', routers.images);
const publicDir = require('path').join(__dirname);
app.use(express.static(publicDir));

module.exports = app;