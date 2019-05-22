const {encryptString} = require('../helpers/crypto');
const jwtToken=require('../helpers/jwtToken');
module.exports = (db) => {
    return {
        register(req) {
            return db.sequelize.transaction(transaction => {
                const {
                    password
                } = req.body;

                req.body.password = encryptString(password);
                return db.User.create(req.body, {
                        transaction: transaction
                    })
                    .then(transaction => {
                        return {
                            status: 201,
                            data: transaction
                        };
                    })
                    .catch(error => {
                        return {
                            status: 500,
                            error: error
                        };
                    })
            })
        },
        login(req) {
            const {password} = req.body;
            req.body.password = encryptString(password)
            return db.User.findOne({
                    where: {
                        email: req.body.email,
                        password: req.body.password
                    }
                })
                .then(User => {
                    User.token=jwtToken.jwtToken(User.id);
                    return {
                        status: 201,
                        data: User
                    }
                })
                .catch(error => {
                    return {
                        status: 500,
                        error: error
                    }
                })
        },

        create(req) {
            return db.User.create(req.body)
                .then(User => {
                    file = req.files
                    file.forEach(Images => {
                        Images.UserId = User.id
                        Images.filePath = Images.path
                    })
                    db.Image.bulkCreate(file, {
                            returning: true
                        }).then(file => {
                            return {
                                status: 201,
                                data: file
                            }
                        })
                        .catch(error => {
                            return {
                                status: 500,
                                error: error
                            }
                        })
                    return {
                        status: 201,
                        data: User
                    }
                })
                .catch(error => {
                    return {
                        status: 500,
                        error: error
                    }
                })

        },
        findAll(req) {
            return db.User.findAll({
                    include: {
                        model: db.Image
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                })

                .then(users => {
                    const oldUrl = req.protocol + "://" + req.headers.host

                    if (users) {

                        users.forEach(user => {
                            if (user.Images.length) {
                                user.Images.forEach(image => {
                                    image.filePath = oldUrl + '/' + image.filePath;
                                });
                            }
                        });
                    }

                    return {
                        status: 201,
                        data: users
                    }
                })
                .catch(error => {
                    return {
                        status: 500,
                        error: error
                    }
                })
        },
        findById(req) {
            return db.User.findByPk(req.params.id, {
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                })
                .then(User => {
                    return {
                        status: 201,
                        data: User
                    }
                })
                .catch(error => {
                    return {
                        status: 500,
                        error: error
                    }
                })
        },
        updateToken(req) {
            return db.User.update({
                    token: req.token
                }, {
                    where: {
                        id: req.id
                    }
                })
                .then(User => {
                    return {
                        status: 201,
                        data: User
                    };
                })
                .catch(error => {
                    return {
                        status: 500,
                        error: error
                    };
                })
        },
        update(req) {
            const id = req.params.id;
            return db.User.update(req.body, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(User => {
                    return {
                        status: 201,
                        data: User
                    };
                })
                .catch(error => {
                    return {
                        status: 500,
                        error: error
                    };
                });
        },
        delete(req) {
            let id = req.params.id;
            return db.User.destroy({
                    where: {
                        id: id
                    }
                })
                .then(User => {
                    return {
                        status: 201,
                        data: User
                    };
                })
                .catch(error => {
                    return {
                        status: 500,
                        error: error
                    };
                });
        }
    }
}