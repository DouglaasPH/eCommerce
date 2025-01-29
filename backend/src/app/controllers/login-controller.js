import loginRepository from "../repositories/login-repository.js";

class LoginController {
    async createAccount(req, res) {
        const { name, email, password, phone_number, } = req.body.params;
        const valuesObject = { name, email, password, phone_number };
        console.log(req.body);
        console.log(valuesObject);
        const row = await loginRepository.create(valuesObject);
        res.json(row);
    }

    async login(req, res) {
        const { email, password } = req.query;
        const row = await loginRepository.confirmLogin(email, password);    
    
        if (row.login) {
            res.cookie('user_token', row.token, {
                httpOnly: true,
                secure: false,
                sameSite: 'Strict',
                maxAge: 24 * 60 * 60 * 1000,
                path: '/',
            });
            res.json({ message: 'successfully logged in', loginned: true });            
        } else {
            res.json({ mesasge: 'not logged in', loginned: false });
        }
    }

    async checkEmail(req, res) {
        const { email } = req.query;
        const row = await loginRepository.validateEmail(email);
        res.json(row);
    }    

    async newPassword(req, res) {
        const { password, email } = req.body;
        const row = await loginRepository.updatePassword(password, email);
        res.json(row);
    }

    async checkUserToken(req, res) {
        const userToken = req.cookies['user_token'];
        if (userToken) {
            res.json({ message: 'successfully logged in', isLogginned: true });
        } else {
            res.json({ message: 'not logged in', isLogginned: false })
        }
    }
}

export default new LoginController();