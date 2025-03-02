import axios from 'axios';

const API_URL = 'http://localhost:3000';

async function login(datas: {email: string, password: string}) {
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
        const response = await axios.get(`${API_URL}/queryCookieUserToken`, { withCredentials: true });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function createAccount(datas: object) {
    try {
        const response = await axios.post(`${API_URL}/createAccount`, {
            params: datas,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function validateEmail(email: string) {
    try {
        const response = await axios.get(`${API_URL}/validateEmail`, {
            params: {
                email: email,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function updatePassword(datas: { email: string; password: string; }) {
    try {
        const response = await axios.put(`${API_URL}/updatePassword`, {
            email: datas.email,
            password: datas.password,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export { login, checkLoggined, createAccount, validateEmail, updatePassword };