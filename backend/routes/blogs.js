const express = require('express')
const BlogController = require('../controller/BlogController')
const auth = require('../middlewares/auth')
const upload = require('../middlewares/multer')
const router = express.Router()

router.post('/add', auth, upload.array('images'), BlogController.addBlog)
router.get('/all', BlogController.allBlog)
router.get('/all/posts/:uid', BlogController.allBlogofUser)
router.post('/update/post', auth, upload.array('images'), BlogController.updateBlog)
router.get('/delete/:id', auth, BlogController.deleteBlog)
router.post('/expression', auth, BlogController.likeDislike)
router.post('/expression/comment', auth, BlogController.comments)
router.get('/expression/comment/:id/delete/:cmntId', BlogController.commentsDlt)



module.exports = router