import axios from 'axios'

export const registration = async (username, email, password) => {

    try {
        const response = axios.post(`https://localhost:5000/api/auth/registration`, {
            username,
            email,
            password
        })
        alert(response.data.message)
    }
    catch (e) {
        alert(e.response.data.message)
    }


}