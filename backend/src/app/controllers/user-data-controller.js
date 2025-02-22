import userDataRepository from "../repositories/user-data.repository.js";

class UserDataController {
    async getUserData(req, res) {
        const { user_id } = req.query;
        const row = await userDataRepository.getUserData(user_id);
        return res.json(row);
    }

    async removeAccount(req, res) {
        const { user_id } = req.query;
        const row = await userDataRepository.removeAccount(user_id);
        return res.json(row);
    }
    async updateAccountDetails(req, res) {
        const { data, user_id } = req.body;
        const row = await userDataRepository.updateAccountDetails(data, user_id);
        return res.json(row);
    }    

    async checkPassword(req, res) {
        const { email, password } = req.query;
        console.log(email, password)
        const row = await userDataRepository.checkPassword(email, password);
        return res.json(row);
    }
}

export default new UserDataController();