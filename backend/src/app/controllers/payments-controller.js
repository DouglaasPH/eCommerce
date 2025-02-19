import paymentsRepository from "../repositories/payments-repository.js";

class PaymentsController {
    async getPayment(req, res) {
        const { order_id } = req.query;
        const row = await paymentsRepository.getPayment(order_id);
        return res.json(row);
    }

    async addPayment(req, res) {
        const { data } = req.body;
        const row = await paymentsRepository.addPayment(data);
        return res.json(row);
    }

    async updateStatusPayment(req, res) {
        const { status, order_id } = req.body;
        const row = await paymentsRepository.updateStatusPayment(status, order_id);
        return res.json(row);
    }    
}

export default new PaymentsController();