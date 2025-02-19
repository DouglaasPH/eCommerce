import installmentRepository from "../repositories/installment-repository.js";

class InstallmentController {
    async getInstallment(req, res) {
        const { value } = req.query;
        const row = await installmentRepository.getInstallment(value);
        return res.json(row);
    }
}

export default new InstallmentController();