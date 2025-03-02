import axios from "axios";

const API_URL = 'http://localhost:3000';

async function getInstallment(value: number) {
    try {
        const response = await axios.get(`${API_URL}/getInstallment`, {
            params: {
                value,
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export { getInstallment };