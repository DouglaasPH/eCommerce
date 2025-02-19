import orderRepository from "../repositories/order-repository.js";

class OrderController {
    async getAllOrder(req, res) {
        const { user_id } = req.query;
        const row = await orderRepository.getAllOrder(user_id)
        return res.json(row);
    }

    async addOrder(data) {
        const { data } = req.body;
        const row = await orderRepository.addOrder(data);
        return res.json(row);
    }

    async updateStatusOrder(req, res) {
        const { status, id } = req.body;
        const row = await orderRepository.updateStatusOrder(status, id);
        return res.json(row);
    }

    async getAllOrderItems(req, res) {
        const { order_id } = req.query;
        const row = await orderRepository.getAllOrderItems(order_id);
        return res.json(row);
    }

    async addOrderItems(req, res) {
        const { data } = req.body;
        const row = await orderRepository.addOrderItems(data);
        return res.json(row);
    }
}

export default new OrderController();