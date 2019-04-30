module.exports = (app, upload, services) => {
    const router = app.Router();
    const {
        Image
    } = services;
    router.post('/upload', upload.array('file', 4), async (req, res) => {
        const filePath = `${req.file.destination}/${req.file.filename}`
        const result = await Image.create({ filePath })
        return res.status(result.status).json(result);
    })
    router.get('/findAll', async (req, res) => {
        const result = await Image.findAll(req);
        return res.status(result.status).json(result);
    })
    router.get('/findById/:id', async (req, res) => {
        const result = await Image.findById(req);
        return res.status(result.status).json(result);
    })
    router.put('/update/:id', async (req, res) => {
        let result = await Image.update(req);
        return res.status(result.status).json(result);
    });
    router.delete('/delete/:id', async (req, res) => {
        let result = await Image.delete(req);
        return res.status(result.status).json(result);
    });
    return router;
}