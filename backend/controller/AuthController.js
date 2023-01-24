const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../Model/User')



exports.registration = async (req, res, next) => {
    try {
        const { name, email, password } = req.body //destructuring the data from the req.body
        const passwordHash = bcrypt.hashSync(password, 10);
        const user = await User.create({ name, email, password: passwordHash })
        return res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)

        })
    } catch (error) {
        console.log(error);
        return res.status(400).json('Something went wrong try again' + error)
    }
}

//login functionalities
exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })

    console.log(user);

    if (!user) {
        return res.status(400).json('User not found')
    }
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
        return res.status(400).json('Wrong Information')
    }

    return res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)

    })

}


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '14d',
    });
}