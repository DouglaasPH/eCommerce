import { consult } from "../database/connection.js";

class LoginRepository {
    createAccount(datas) {
        const sql = "INSERT INTO users SET ?";
        return consult(sql, datas, 'Unable to query the database.');
    }
    login(email, password) {
        const sql = "SELECT * FROM users WHERE email =? AND password =?";
        return consult(sql, [email, password], 'Unable to query the database.');
    }
    updatePassword(password, email) {
        const sql = "UPDATE users SET password=? WHERE email =?";
        return consult(sql, [password, email], 'Unable to query the database.');
    }

    validateEmail(email) {
        const sql = "SELECT * FROM users WHERE email =?";
        return consult(sql, [email], 'Unable to query the database.');
    }
}

export default new LoginRepository();