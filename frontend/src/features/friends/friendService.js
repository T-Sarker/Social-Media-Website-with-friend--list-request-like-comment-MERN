import axios from "axios";


const allUsers = async () => {
    const result = await axios.get('/friend/all', {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
        }
    })
    if (result) {
        return result.data
    }
}

const currentUsersFriendRequests = async () => {
    const result = await axios.get('/friend/myreq/', {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
        }
    })
    if (result) {
        return result.data
    }
}

const handelFriendRequests = async (reqData) => {
    const result = await axios.post('/friend/request/handel', reqData, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
        }
    })
    if (result) {
        return result.data
    }
}


const addFriends = async (fData) => {
    const result = await axios.post('/friend/add', fData, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
        }
    })
    if (result) {
        return result.data
    }
}

const FriendService = { allUsers, currentUsersFriendRequests, handelFriendRequests, addFriends }

export default FriendService