const express = require('express');
const multer = require('multer');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const passport = require('passport');
app.use(passport.initialize());
const JwtStrategy = require('passport-jwt').Strategy

const CryptoJS = require("crypto-js");
const jwtToken = require('./helpers/jwtToken.js')(passport);
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
const jwt = require('jsonwebtoken');
const routers = require('./routes')(express, upload, CryptoJS,passport,jwt);
app.use('/users', routers.users);
app.use('/images', routers.images);

const publicDir = require('path').join(__dirname);
app.use(express.static(publicDir));

module.exports = app;