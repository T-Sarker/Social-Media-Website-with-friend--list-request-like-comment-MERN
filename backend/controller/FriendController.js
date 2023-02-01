const FriendModel = require('../Model/Friends')
const UserModel = require('../Model/User')

exports.addFriendReq = async (req, res, next) => {

    try {
        const addF = await FriendModel.create({ toId: req.body.toId, fromId: req.userId })
        return res.status(200).json({ type: 'success', addF })
    } catch (error) {
        console.log(error);
        return res.json({ type: 'error', error })
    }
}


exports.myAllFriendsReq = async (req, res, next) => {

    //all the requests that are available for current user
    try {
        const allReq = await FriendModel.find({ toId: req.userId }).populate('fromId').populate('toId')
        return res.status(200).json({ type: 'success', allReq })
    } catch (error) {
        console.log(error);
        return res.json({ type: 'error', error })
    }
}

exports.responseMyFriendsReq = async (req, res, next) => {

    //all the requests that are available for current user
    try {
        if (req.body.type === 'accept') {
            const allReq = await FriendModel.findByIdAndUpdate(req.body.reqId, { $set: { status: true } })
            const updateUser = await UserModel.findByIdAndUpdate(req.userId, { $push: { friends: allReq.fromId } })
            const updateUser2 = await UserModel.findByIdAndUpdate(allReq.fromId, { $push: { friends: allReq.toId } })
            return res.status(200).json({ type: 'success', allReq })
        }

        if (req.body.type === 'decline') {
            const allReq = await FriendModel.findByIdAndRemove(req.body.reqId)
            return res.status(200).json({ type: 'success', allReq })
        }


    } catch (error) {
        console.log(error);
        return res.json({ type: 'error', error })
    }
}

exports.deleteMyFriend = async (req, res, next) => {

    //all the requests that are available for current user
    try {

        const allReq = await FriendModel.findByIdAndRemove(req.body.reqId)
        const updateUser = await UserModel.findByIdAndUpdate(req.body.reqId, { $pull: { friends: req.body.reqId } })
        return res.status(200).json({ type: 'success', allReq })

    } catch (error) {
        console.log(error);
        return res.json({ type: 'error', error })
    }
}


exports.allUsers = async (req, res, next) => {
    //get all the users to show them in sidebar 
    //where user can add them as friend

    try {
        const allUser = await UserModel.find({ _id: { $ne: req.userId } }).select('-password').populate('friends')
        return res.status(200).json({ type: 'success', allUser })
    } catch (error) {
        console.log(error);
        return res.json({ type: 'error', error })
    }
}