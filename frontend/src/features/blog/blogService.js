import axios from "axios";

const addBlog = async (blog) => {

    const result = await axios.post('/blog/add', blog, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
        }
    })
    if (result) {
        return result.data;
    }

}

const allBlog = async () => {

    const result = await axios.get('/blog/all')
    if (result) {
        return result.data
    }

}


const blogService = { addBlog, allBlog }

export default blogService