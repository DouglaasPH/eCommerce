import axios from "axios";

const API_URL = 'http://localhost:3000';

async function getAllAddress(user_id: number) {
    try {
        const response = await axios.get(`${API_URL}/getAllAddress`, {
            params: {
                user_id
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function updateAddress(newAddress: object, address_position: number, user_id: number) {
    try {
        const response = await axios.put(`${API_URL}/updateAddress`, {
            newAddress,
            address_position,
            user_id
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function addAddress(newAddress: object, user_id: number) {
    try {
        const response = await axios.post(`${API_URL}/addNewAddress`, {
            newAddress,
            user_id
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function removeAddress(user_id: number, address_position: number) {
    try {
        const response = await axios.put(`${API_URL}/removeAddress`, {
            user_id,
            address_position,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export { getAllAddress, updateAddress, addAddress, removeAddress };