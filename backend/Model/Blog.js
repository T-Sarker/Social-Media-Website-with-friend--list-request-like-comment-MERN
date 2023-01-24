const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        default: null
    },
    slug: {
        required: true,
        type: String
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [],
    likes: []
}, {
    timestamps: true
})

const BlogModel = mongoose.model('Blog', BlogSchema)

module.exports = BlogModel

