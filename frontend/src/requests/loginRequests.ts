import axios from 'axios';
import { AuthGuard } from '../app/auth.guard';

const API_URL = 'http://localhost:3000';

async function requestSignIn(datas: {email: string, password: string}) {
    try {
        const response = await axios.get(`${API_URL}/login`, {
            params: {
                email: datas.email,
                password: datas.password,
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function checkLoggined() {
    try {
        const response = await axios.get(`${API_URL}/queryCookieUserToken`, { withCredentials: true});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export { requestSignIn, checkLoggined };