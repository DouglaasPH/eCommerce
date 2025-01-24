import { verifyToken } from "../jwt/jwt.js";
import loginRepository from "../repositories/login-repository.js";

class LoginController {
    async createAccount(req, res) {
        const { name, email, password, phone_number, } = req.body;
        const valuesObject = { name, email, password, phone_number };
        const row = await loginRepository.create(valuesObject);
        res.json(row);
    }

    async login(req, res) {
        const { name, password } = req.query;
        const row = await loginRepository.confirmLogin(name, password);
        res.json(row);
        const result = verifyToken(row.token);
        console.log(result)
    }

    async newPassword(req, res) {
        const { password, email } = req.body;
        const row = await loginRepository.updatePassword(password, email);
        res.json(row);
    }
}

export default new LoginController();