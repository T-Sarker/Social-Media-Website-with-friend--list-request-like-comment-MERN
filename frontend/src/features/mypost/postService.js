import axios from "axios";

const getMyPost = async (userId) => {
    const result = await axios.get('/blog/all/posts/' + userId)

    if (result) {
        return result.data
    }
}

const updateMyPost = async (postdata) => {
    const result = await axios.post('/blog/update/post', postdata, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
        }
    })

    if (result) {
        return result.data
    }
}

const deleteMyPost = async (id) => {
    const result = await axios.get('/blog/delete/' + id, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
        }
    })
    if (result) {
        return result.data
    }
}


const likeAndDislike = async (expdata) => {
    const result = await axios.post('/blog/expression/', expdata, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
        }
    })
    if (result) {
        return result.data
    }
}




const comments = async (expdata) => {
    const result = await axios.post('/blog/expression/comment', expdata, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
        }
    })
    if (result) {
        return result.data
    }
}


const commentsDelete = async (expdata) => {
    const result = await axios.get('/blog/expression/comment/' + expdata.pid + '/delete/' + expdata.cmntId, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
        }
    })
    if (result) {
        return result.data
    }
}


const postService = { getMyPost, updateMyPost, deleteMyPost, likeAndDislike, comments, commentsDelete }

export default postService