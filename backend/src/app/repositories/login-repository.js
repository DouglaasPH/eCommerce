import { consult } from "../database/connection.js";

class LoginRepository {
    create(datas) {
        const sql = "INSERT INTO users SET ?";
        return consult(sql, datas, "Unable to request account registration!");
    }
    confirmLogin(email, password) {
        const sql = "SELECT * FROM users WHERE email =? AND password =?";
        return consult(sql, [email, password], "Unable to request login confirmaton!");
    }
    updatePassword(password, email) {
        const sql = "UPDATE users SET password=? WHERE email =?";
        return consult(sql, [password, email], "Unable to request password update!");
    }

    validateEmail(email) {
        const sql = "SELECT * FROM users WHERE email =?";
        return consult(sql, [email], "Unable to request email validation!");
    }
}

export default new LoginRepository();