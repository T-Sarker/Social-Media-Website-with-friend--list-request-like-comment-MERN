const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    password: {
        type: String,
        required: true,
        unique: true
    },
}, {
    timestamps: true
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel