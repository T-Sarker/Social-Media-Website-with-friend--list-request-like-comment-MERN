import axios from 'axios'

const register = async (userData) => {
    try {
        const result = await axios.post('/register', userData)

        if (result.data) {
            localStorage.setItem('user', JSON.stringify(result.data))
        }
        return result.data;
    } catch (error) {
        console.log(error);
    }
}


const login = async (formData) => {
    const result = await axios.post('/login', formData)
    console.log(result.data);
    if (result.data) {
        localStorage.setItem('user', JSON.stringify(result.data))
    }
    return result.data
}


const getMe = async () => {
    const result = await axios.get('/me', {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
        }
    })

    return result.data
}

const logout = () => {
    localStorage.removeItem('user')
}
const authService = {
    register,
    logout,
    login,
    getMe
}

export default authService