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
        const row = await userDataRepository.checkPassword(email, password);
        return res.json(row);
    }

    async getAllOrders(req, res) {
        const { user_id } = req.query;
        const row = await userDataRepository.getAllOrders(user_id);
        return res.json(row);
    }

    async getAllPaymentFromOrder(req, res) {
        const { order_id } = req.query;
        const row = await userDataRepository.getAllPaymentFromOrder(order_id);
        return res.json(row);
    }

    async getAllOrderItems(req, res) {
        const { order_id } = req.query;
        const row = await userDataRepository.getAllOrderItems(order_id);
        return res.json(row);
    }

    async getProductInformation(req, res) {
        const { id } = req.query;
        const row = await userDataRepository.getProductInformation(id);
        const product = {
            id: row[0].id,
            description: row[0].description,
            images_path: JSON.parse(row[0].status)[0]
        }
        return res.json(product);
    }

    async getAllOrderInformation(req, res) {
        const { order_id } = req.query;
        const row = await userDataRepository.getAllOrderInformation(order_id);
        return res.json(row);
    }
}

export default new UserDataController();