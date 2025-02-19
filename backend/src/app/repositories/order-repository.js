import { consult } from "../database/connection.js";

class OrderRepository {
    async getAllOrder(user_id) {
        const sql = 'SELECT * FROM orders WHERE user_id = ?';
        return consult(sql, [user_id], 'Unable to query the database.');
    }

    async addOrder(data) {
        const sql = 'INSERT INTO orders SET ?';
        return consult(sql, [data], 'Unable to query the database.');
    }

    async updateStatusOrder(status, id) {
        const sql = 'UPDATE orders SET ? WHERE id = ?';
        return consult(sql, [status, id], 'Unable to query the database.');
    }

    async getAllOrderItems(order_id) {
        const sql = 'SELECT * FROM order_items WHERE order_id = ?';
        return consult(sql, [order_id], 'Unable to query the database.');
    }

    async addOrderItems(data) {
        const sql = 'INSERT INTO order_items SET ?';
        return consult(sql, [data], 'Unable to query the database.');
    }
}

export default new OrderRepository();