const express = require('express')
const FriendController = require('../controller/FriendController')
const auth = require('../middlewares/auth')
const router = express.Router()


router.post('/add', auth, FriendController.addFriendReq)
router.get('/myreq', auth, FriendController.myAllFriendsReq)
router.get('/all', auth, FriendController.allUsers)
router.post('/request/handel', auth, FriendController.responseMyFriendsReq)


module.exports = router