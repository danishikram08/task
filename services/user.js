module.exports = db => {
    return {
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

                    if(users){

                        users.forEach(user => {
                            if(user.Images.length) {
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