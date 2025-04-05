function authMiddleware(req, res, next) {
    if (req.session.isAuth) {
        next()
    } else {
        res.json({ error: 'unauthorized' })
    }
}

module.exports = authMiddleware