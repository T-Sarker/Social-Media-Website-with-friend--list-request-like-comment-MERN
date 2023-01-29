const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);
    try {
        if (token) {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decode?.id
            // req.userId = decode?.id
        }
    } catch (error) {
        return res.json({ type: 'error', error })
    }
    next();
}

module.exports = auth