module.exports = (app, upload, services, CryptoJS,passport,jwt) => {
    const router = app.Router();
    const {User} = services;
    router.post('/upload', upload.any('file'), async (req, res) => {
        const result = await User.create(req);
        // const oldUrl = req.protocol + "://" + req.headers.host+ req.originalUrl
        return res.status(result.status).json(result);
    });
    // register route
    router.post('/register', async (req, res) => {
        const result = await User.register(req);
        return res.status(result.status).json(result);
    });
    //login route
    router.post('/login', async (req, res) => {
        let result = await User.login(req);
        let results = await User.updateToken(result.data);
        return res.status(result.status).json(result.data);
    });
    router.get('/findAll',passport.authenticate('jwt', { session: false }),async (req, res) => {
        const result = await User.findAll(req);
        return res.status(result.status).json(result);
    })
    router.get('/findById/:id', async (req, res) => {
        const result = await User.findById(req);
        return res.status(result.status).json(result);
    })

    router.put('/update/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
        let result = await User.update(req);
        return res.status(result.status).json(result.data);
    });
    router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
        let result = await User.delete(req);
        return res.status(result.status).json(result);
    });
    return router;
}