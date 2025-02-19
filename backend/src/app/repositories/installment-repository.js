import { consult } from "../database/connection.js";

class InstallmentRepository {
    async getInstallment(value) {
        const sql = 'SELECT * FROM installment WHERE min_value < ? AND max_value_without_fees > ?';
        return consult(sql, [value, value], 'Unable to query the database.');
    }
}

export default new InstallmentRepository();