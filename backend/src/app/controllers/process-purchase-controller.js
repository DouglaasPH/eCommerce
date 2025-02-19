import processPurchaseRepository from "../repositories/process-purchase-repository.js";

class processPurchaseController {
    async getAllAddress(req, res) {
        const { user_id } = req.query;
        const row = await processPurchaseRepository.getAllAdress(user_id);
        const row_json = JSON.parse(row[0].address);
        return res.json(row_json);
    }


    async addNewAddress(req, res) {
        const { newAddress, user_id } = req.body;
        const row = await processPurchaseRepository.addNewAddress(newAddress, user_id);
        return res.json(row);        
    }

    async updateAddress(req, res) {
        const { newAddress, address_position, user_id } = req.body;
        const row = await processPurchaseRepository.updateAddress(newAddress, address_position, user_id);
        return res.json(row);
    }    

    async removeAddress(req, res) {
        const { address_position, user_id } = req.body;
        const row = await processPurchaseRepository.removeAddress(address_position, user_id);
        return res.json(row);
    }

    async confirmCoupon(req, res) {
        const { coupon_code } = req.query;
        const row = await processPurchaseRepository.confirmCoupon(coupon_code);
        return res.json(row);
    }

    async useCoupon(req, res) {
        const { coupon_code } = req.query;
        const row = await processPurchaseRepository.useCoupon(coupon_code);
        return res.json(row);
    }
}

export default new processPurchaseController();