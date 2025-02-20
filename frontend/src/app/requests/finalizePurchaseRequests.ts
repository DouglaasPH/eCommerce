import axios from "axios";

const API_URL = 'http://localhost:3000';

/*
1 - REQUEST PARA ADICIONAR UMA NOVA ORDER EM ORDERS
  - O QUE PRECISO?
    - user_id
    - status = 'pending'
    - address = address do orderData
    - subtotal = orderSumary.fullPriceWithoutDiscount
    - shipping_price = 0
    - discount = orderSumary.couponDiscount
    - total = orderSumary.total
*/
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

/*
2 - REQUEST PARA ADICIONAR UM payment
  - O QUE PRECISO?
    - order_id
    - payment_method
    - status = 'pending'
*/

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

/*
3 - REMOVE ITENS NA TABELA cart_items
    - O QUE PRECISO?
    - id dos pedidos atuais do pedido
*/


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

/*
4 - ADICIONAR ITENS NO order_items
  - O QUE PRECISO?
    - order_id
    - product_id
    - quantity
        - size
        - price
*/

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