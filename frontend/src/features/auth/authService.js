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


const login = async (user) => {
    const result = await axios.post('/login', user)
    console.log('result is' + result);
    if (result.data) {
        localStorage.setItem('user', JSON.stringify(result.data))
    }
    return result.data
}

const logout = () => {
    localStorage.removeItem('user')
}
const authService = {
    register,
    logout,
    login,
}

export default authService