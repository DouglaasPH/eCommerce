import { consult } from "../database/connection.js";

class PaymentsRepository {
    async getPayment(order_id) {
        const sql = 'SELECT * FROM payments WHERE order_id = ?';
        return consult(sql, [order_id], 'Unable to query the database.');
    }

    async addPayment(data) {
        const sql = 'INSERT INTO payments SET ?';
        return consult(sql, [data], 'Unable to query the database.');
    }

    async updateStatusPayment(status, order_id) {
        const sql = 'UPDATE payments SET ? WHERE order_id = ?';
        return consult(sql, [status, order_id], 'Unable to query the database.');
    }
}

export default new PaymentsRepository();