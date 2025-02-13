import { consult } from "../database/connection.js";

class ShoppingCartRepository {
    getAllUserItem(user_id) {
        const sql = 'SELECT * FROM cart_items WHERE user_id = ?';
        return consult(sql, [user_id], 'Unable to query the database.');
    }

    addItem(item) {
        const sql = 'INSERT INTO cart_items SET ?';
        return consult(sql, item, 'Unable to query the database.');
    }

    updateItem(datas, user_id, product_id) {
        const sql = 'UPDATE cart_items SET ? WHERE user_id = ? AND product_id = ?';
        return consult(sql, [datas, user_id, product_id], 'Unable to query the database.');
    }

    removeItem(id) {
        const sql = 'DELETE FROM cart_items WHERE id = ?';
        return consult(sql, [id], 'Unable to query the database.');
    }
}

export default new ShoppingCartRepository();