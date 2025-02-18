import axios from "axios";

const API_URL = 'http://localhost:3000';

async function getAllUserItem(user_id: number) {
    try {
        const response = await axios.get(`${API_URL}/getAllUserItem`, {
            params: {user_id}
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function addItem(item: object) {
    try {
        const response = await axios.post(`${API_URL}/addItem`, {
            item
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
} 

async function updateItem(datas: object, id: number) {
    try {
        const response = await axios.put(`${API_URL}/updateItem`, {
            datas,
            id,
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

async function removeItem(id: number) {
    try {
        const response = await axios.delete(`${API_URL}/removeItem`, {
            params: {
                id
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export { getAllUserItem, addItem, updateItem, removeItem };