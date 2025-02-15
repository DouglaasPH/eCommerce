import shoppingCartRepository from "../repositories/shopping-cart-repository.js";

class ShoppingCartController {
    async getAllUserItem(req, res) {
        const { user_id } = req.query;
        const row = await shoppingCartRepository.getAllUserItem(user_id); 
        return res.json(row);
    }

    async addItem(req, res) {
        const { item } = req.body;
        const row = await shoppingCartRepository.addItem(item);
        return res.json(row);
    }

    async updateItem(req, res) {
        const { datas, id } = req.body;
        const row = await shoppingCartRepository.updateItem(datas, id);
        return res.json(row);
    }

    async removeItem(req, res) {
        const { id } = req.query;
        const row = await shoppingCartRepository.removeItem(id);
        return res.json(row);
    }
}

export default new ShoppingCartController();