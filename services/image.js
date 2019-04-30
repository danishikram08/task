module.exports = db => {
    return {
        create(req) {
            return db.sequelize.transaction(t => {
                return db.Image.create(req, {
                        transaction: t
                    })
                    .then(Image => {
                        return {
                            status: 201,
                            data: Image
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
        findAll(req) {
            return db.Image.findAll({
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                })
                .then(Image => {
                    return {
                        status: 201,
                        data: Image
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
            return db.Image.findByPk(req.params.id, {
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                })
                .then(Image => {
                    return {
                        status: 201,
                        data: Image
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
            return db.Image.update(req.filePath, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(Image => {
                    return {
                        status: 201,
                        data: Image
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
            return db.Image.destroy({
                    where: {
                        id: id
                    }
                })
                .then(Image => {
                    return {
                        status: 201,
                        data: Image
                    };
                })
                .catch(error => {
                    return {
                        status: 500,
                        error: error
                    };
                });
        },
    }
}