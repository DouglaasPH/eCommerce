import shoppingCartRepository from "../repositories/shopping-cart-repository.js";

class ShoppingCartController {
    async getAllUserItem(req, res) {
        const { user_id } = req.query;
        console.log(user_id)
        const row = await shoppingCartRepository.getAllUserItem(user_id); 
        return res.json(row);
    }

    async addItem(req, res) {
        const { item } = req.body;
        const row = await shoppingCartRepository.addItem(item);
        return res.json(row);
    }

    async updateItem(req, res) {
        const { datas, user_id, product_id } = req.body;
        const row = await shoppingCartRepository.updateItem(datas, user_id, product_id);
        return res.json(row);
    }

    async removeItem(req, res) {
        const { user_id, product_id } = req.query;
        const row = await shoppingCartRepository.removeItem(user_id, product_id);
        return res.json(row);
    }
}

export default new ShoppingCartController();