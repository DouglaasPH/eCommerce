import { consulta } from "../database/conection.js";

class LoginRepository {
    create(datas) {
        const sql = "INSERT INTO users SET ?";
        return consulta(sql, datas, "Unable to register account!");
    }
    confirmLogin(name, password) {
        const sql = "SELECT * FROM users WHERE name =? AND password =?";
        return consulta(sql, [name, password], "Unable to confirm login!");
    }
    updatePassword(password, email) {
        const sql = "UPDATE users SET password=? WHERE email =?";
        return consulta(sql, [password, email], "Unable to update password!");
    }
}

export default new LoginRepository();