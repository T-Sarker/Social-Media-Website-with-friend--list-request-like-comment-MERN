const BlogModel = require('../Model/Blog')
const slugk = require('../middlewares/slug')
const fs = require('fs')
const path = require('path');

exports.addBlog = async (req, res, next) => {
    const { title, description, tags, name } = req.body
    let filNames = [];
    try {
        // console.log(req.body);
        // console.log(req.files);
        const uId = req.userId;
        const slug = slugk.MakeSlug(req)
        for (let i = 0; i < req.files.length; i++) {
            filNames.push(req.files[i].filename);
        }
        const blog = await BlogModel.create({ title, description, tags, name, slug, images: filNames, creator: uId, likes: [] })
        if (blog) {
            return res.status(200).json({ type: 'success', blog })
        }
    } catch (error) {
        console.log(error);
        return res.json({ type: 'error', error })
    }
}

exports.allBlog = async (req, res, next) => {
    try {
        const allBlogs = await BlogModel.find().sort({ _id: -1 })
        return res.status(200).json({ type: 'success', allBlogs })
    } catch (error) {
        return res.json({ type: 'error', error })
    }
}
exports.allBlogofUser = async (req, res, next) => {
    try {
        const allBlogs = await BlogModel.find({ creator: req.params.uid }).sort({ _id: -1 })
        return res.status(200).json({ type: 'success', allBlogs })
    } catch (error) {
        return res.json({ type: 'error', error })
    }
}

// exports.editBlog = async (req, res, next) => {
//     try {
//         const blog = await BlogModel.findById(req.params.id)
//         if (blog) {
//             return res.status(200).json({ type: 'success', blog })
//         }
//     } catch (error) {
//         return res.json({ type: 'error', error })
//     }
// }

exports.updateBlog = async (req, res, next) => {


    let pathimg = "public/uploads/";

    const { title, description, tags, name } = req.body
    const blogId = req.body.id

    let filNames = [];

    try {
        const slug = slugk.MakeSlug(req)
        const blog = await BlogModel.findById(req.body.id)

        if (req.files.length === 0) {
            const blogU = await BlogModel.findOneAndUpdate({ _id: blogId }, {
                $set: {
                    title, description, tags, slug
                }
            })
            if (blogU) {
                return res.status(200).json({ type: 'success', blog })
            }
        }
        if (req.files.length > 0) {
            for (let i = 0; i < req.files.length; i++) {
                filNames.push(req.files[i].filename);
            }
            const blogU = await BlogModel.findOneAndUpdate({ _id: blogId }, {
                $set: {
                    title, description, tags, images: filNames, slug
                }
            })
            if (blogU) {
                blog.images.forEach(function (filename) {
                    fs.unlink(pathimg + filename, err => console.log(err))
                });

            }
        }
    } catch (error) {
        console.log(error);
        return res.json({ type: 'error', error })
    }
}

exports.deleteBlog = async (req, res, next) => {
    let pathimg = "public/uploads/";
    try {

        const blog = await BlogModel.findOne({ _id: req.params.id })
        if (blog) {
            blog.images.forEach(function (filename) {

                fs.unlink(pathimg + filename, err => console.log(err))
            });
        }
        const dlt = await BlogModel.findByIdAndDelete(req.params.id)
        console.log(dlt);
        return res.status(200).json({ type: 'success', blog })
    } catch (error) {
        return res.json({ type: 'error', error })
    }
}

exports.likeDislike = async (req, res, next) => {

    try {
        const post = await BlogModel.findOne({ _id: req.body.pid, likes: { $elemMatch: { $eq: req.body.user } } })
        if (!post) {
            const result = await BlogModel.findByIdAndUpdate(req.body.pid, {
                $push: {
                    likes: req.body.user
                }
            })
            return res.status(200).json({ type: 'success', result })
        } else {
            const result = await BlogModel.findByIdAndUpdate(req.body.pid, {
                $pull: {
                    likes: req.body.user
                }
            })
            return res.status(200).json({ type: 'success', result })
        }
    } catch (error) {
        return res.json({ type: 'error', error })
    }
}



exports.comments = async (req, res, next) => {

    try {
        const data = {
            user: req.body.user,
            userName: req.body.name,
            msg: req.body.commentText
        }

        const result = await BlogModel.findByIdAndUpdate(req.body.pid, {
            $push: {
                comments: data
            }
        })
        return res.status(200).json({ type: 'success', result })

    } catch (error) {
        return res.json({ type: 'error', error })
    }
}


exports.commentsDlt = async (req, res, next) => {

    try {
        const result = await BlogModel.findByIdAndUpdate(req.params.id, {
            $pull: {
                comments: { _id: req.params.cmntId }
            }
        })
        return res.status(200).json({ type: 'success', result })

    } catch (error) {
        return res.json({ type: 'error', error })
    }
}