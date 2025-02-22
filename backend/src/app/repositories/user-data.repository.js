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
}

export default new UserDataRepository();