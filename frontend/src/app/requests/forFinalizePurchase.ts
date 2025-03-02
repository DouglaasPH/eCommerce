import axios from "axios";

const API_URL = 'http://localhost:3000';

async function addOrder(data: object) {
    try {
        const response = await axios.post(`${API_URL}/addOrder`, {
            data
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function getOrderIdForAddPaymentRequest(user_id: number) { 
    try {
        const response = await axios.get(`${API_URL}/getAllOrder`, {
            params: {
                user_id
            }
        });
        const responseLength = response.data.length;
        return response.data[responseLength - 1];
    } catch (error) {
        console.log(error);
    }    
}

async function addPayment(data: object) {
    try {
        const response = await axios.post(`${API_URL}/addPayment`, {
            data
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


async function removeItemFromShoppingCart(id: number) {
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

async function addOrderItem(data: object) {
    try {
        const response = await axios.post(`${API_URL}/addOrderItems`, {
            data
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export { addOrder, getOrderIdForAddPaymentRequest, addPayment, removeItemFromShoppingCart, addOrderItem }