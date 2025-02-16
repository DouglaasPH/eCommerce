import { generateToken, verifyToken } from "../jwt/jwt.js";
import loginRepository from "../repositories/login-repository.js";

class LoginController {
    async createAccount(req, res) {
        const { name, email, password, phone_number, } = req.body;
        const valuesObject = { name, email, password, phone_number };
        const row = await loginRepository.createAccount(valuesObject);

        if (row.affectedRows > 0) {
            return res.json({ message: 'Account created sucessfully', accountCreate: true });
        } else return res.json({ message: 'Account was not created', accountCreate: false });
    }

    async login(req, res) {
        const { email, password } = req.query;
        const row = await loginRepository.login(email, password);    

        if (row.length > 0) {
            const token = generateToken({
                id: row[0].id,
                username: row[0].name,
                email: row[0].email,
                phoneNumber: row[0].phone_number,
            });
            res.cookie('user_token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'Strict',
                maxAge: 24 * 60 * 60 * 1000,
                path: '/',
            });
                
            return res.json({ message: 'successfully logged in', loginned: true });
        } else {
            return res.json({ mesasge: 'not logged in', loginned: false });
        };
    }

    async validateEmail(req, res) {
        const { email } = req.query;
        const row = await loginRepository.validateEmail(email);

        if (row.length > 0) {
            return res.json({ message: 'The email is already registered in the database', registeredEmail: true });
        } else return res.json({ message: 'The email is not registered in the database', registeredEmail: false });        
    }    

    async updatePassword(req, res) {
        const { password, email } = req.body;
        const row = await loginRepository.updatePassword(password, email);

        if (row.affectedRows > 0) {
            return res.json({ message: 'Password updated succesfully', updatedPassword: true });
        } else return res.json({ message: 'Unable to update password', updatedPassword: false });
    }

    async checkUserToken(req, res) {
        const userToken = req.cookies['user_token'];
        const tokenData = await verifyToken(userToken);

        if (userToken && (tokenData !== 'TokenExpiredError' && tokenData !== 'JsonWebTokenError')) {
            console.log('passou')
            res.json({ message: 'successfully logged in', isLogginned: true, id: tokenData.id });
        } else {
            console.log('nao passou')
            res.clearCookie('user_token');
            res.json({ message: 'not logged in', isLogginned: false })
        }
    }
}

export default new LoginController();