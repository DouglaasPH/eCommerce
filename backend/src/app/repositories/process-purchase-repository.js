import { consult } from "../database/connection.js";

class processPurchase {
    getAllAdress(id) {
        const sql = 'SELECT address FROM users WHERE id =?';
        return consult(sql, [id], 'Unable to query the database.');
    }

    addNewAddress(newAddress, user_id) {
        const sql = `UPDATE users SET address = JSON_ARRAY_APPEND(address, '$', JSON_OBJECT(
        'uf', ?,
        'cep', ?,
        'city', ?,
        'number', ?,
        'sender', ?,
        'reference', ?,
        'complement', ?,
        'logradouro', ?,
        'neighborhood', ?)) WHERE id = ?`;

        return consult(sql, [
            newAddress.uf,
            newAddress.cep,
            newAddress.city,
            newAddress.number,
            newAddress.sender,
            newAddress.reference,
            newAddress.complement,
            newAddress.logradouro,
            newAddress.neighborhood,
            user_id
        ], 'Unable to query the database.');
    }

    updateAddress(newAddress, address_position, user_id) {
        const sql = `UPDATE users SET address = JSON_SET(address,
        CONCAT('$[', ?, '].uf'), ?,
        CONCAT('$[', ?, '].cep'), ?, 
        CONCAT('$[', ?, '].city'), ?, 
        CONCAT('$[', ?, '].number'), ?, 
        CONCAT('$[', ?, '].sender'), ?, 
        CONCAT('$[', ?, '].reference'), ?, 
        CONCAT('$[', ?, '].complement'), ?, 
        CONCAT('$[', ?, '].logradouro'), ?, 
        CONCAT('$[', ?, '].neighborhood'), ? ) WHERE id = ?`;

        return consult(sql, [
            address_position, newAddress.uf,
            address_position, newAddress.cep,
            address_position, newAddress.city,
            address_position, newAddress.number,
            address_position, newAddress.sender,
            address_position, newAddress.reference,
            address_position, newAddress.complement,
            address_position, newAddress.logradouro,
            address_position, newAddress.neighborhood,
            user_id
        ], 'Unable to query the database.');
    }

    removeAddress(address_position, user_id) {
        const sql = `UPDATE users SET address = JSON_REMOVE(address, CONCAT('$[', ?, ']')) WHERE id =?`;
        return consult(sql, [address_position, user_id], 'Unable to query the database.');        
    }


    confirmCoupon(coupon_code) {
        const sql = `SELECT * FROM coupons WHERE coupon_code =?`;
        return consult(sql, [coupon_code], 'Unable to query the database.');
    }

    useCoupon(coupon_code) {
        const sql = `UPDATE coupons SET quantity_available = quantity_available - 1 WHERE coupon_code =?`;
        return consult(sql, [coupon_code], 'Unable to query the database.');
    }
}

export default new processPurchase();