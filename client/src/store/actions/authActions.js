import axios from 'axios'
import config from '@/config.json'

export const registration = async (username, email, password) => {

    try {
        const response = await axios.post(config.proxy + `auth/registration`, {
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