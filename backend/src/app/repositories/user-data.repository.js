import { consult } from "../database/connection.js";

class UserDataRepository {
    getUserData(user_id) {
        const sql = "SELECT name, phone_number, gender, email, cpf, date_of_birth FROM users WHERE id = ?";
        return consult(sql, [user_id], 'Unable to query the database.');
    }
    removeAccount(user_id) {
        const sql = "DELETE FROM users WHERE id = ?";
        return consult(sql, [user_id], 'Unable to query the database.');
    }    
    updateAccountDetails(data, user_id) {
        const sql = "UPDATE users SET ? WHERE id = ?";
        return consult(sql, [data, user_id], 'Unable to query the database.');
    }        

    checkPassword(email, password) {
        const sql = 'SELECT id FROM users WHERE email = ? AND password = ?';
        return consult(sql, [email, password], 'Unable to query the database.');
    }

    getAllOrders(user_id) {
        const sql = "SELECT id, created_at, status FROM orders WHERE user_id = ?";
        return consult(sql, [user_id], 'Unable to query the database.');
    }

    getAllOrderItems(order_id) {
        const sql = "SELECT * FROM order_items WHERE order_id = ?";
        return consult(sql, [order_id], 'Unable to query the database.');
    }

    getAllPaymentFromOrder(order_id) {
        const sql = "SELECT id, order_id, payment_method, status FROM payments WHERE order_id = ?";
        return consult(sql, [order_id], 'Unable to query the database.');
    }
        
    getProductInformation(id) {
        const sql = "SELECT id, description, images_path status FROM sale_items WHERE id = ?";
        return consult(sql, [id], 'Unable to query the database.');        
    }

    getAllOrderInformation(order_id) {
        const sql = "SELECT * FROM orders WHERE id = ?";
        return consult(sql, [order_id], 'Unable to query the database.');
    }
}

export default new UserDataRepository();