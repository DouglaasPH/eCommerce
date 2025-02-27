import axios from "axios";

const API_URL = 'http://localhost:3000';

async function getUserData(user_id: number) {
    try {
        const response = await axios.get(`${API_URL}/getUserData`, {
            params: {
                user_id
            }
        });
        return response.data[0];
    } catch (error) {
        console.log(error);
    }
}

async function removeAccount(user_id: number) {
    try {
        const response = await axios.delete(`${API_URL}/removeAccount`, {
            params: {
                user_id
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }    
}

async function updateAccountDetails(data: object, user_id: number) {
    try {
        const response = await axios.put(`${API_URL}/updateAccountDetails`, {
            data,
            user_id
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }    
}

async function checkPassword(email: string, password: string) {
    try {
        const response = await axios.get(`${API_URL}/checkPassword`, {
            params: {
                email,
                password
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }    
}


export { getUserData, removeAccount, updateAccountDetails, checkPassword };