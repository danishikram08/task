module.exports = (app, upload, services) => {
    const router = app.Router();
    const {
        User
    } = services;
    router.post('/upload', upload.any('file'), async (req, res) => {
        const result = await User.create(req);
        // const oldUrl = req.protocol + "://" + req.headers.host+ req.originalUrl
        return res.status(result.status).json(result);
    });
    router.get('/findAll', async (req, res) => {
        const result = await User.findAll(req);
        return res.status(result.status).json(result);
    })
    router.get('/findById/:id', async (req, res) => {
        const result = await User.findById(req);
        return res.status(result.status).json(result);
    })
    router.put('/update/:id', async (req, res) => {
        let result = await User.update(req);
        return res.status(result.status).json(result);
    });
    router.delete('/delete/:id', async (req, res) => {
        let result = await User.delete(req);
        return res.status(result.status).json(result);
    });
    return router;
}