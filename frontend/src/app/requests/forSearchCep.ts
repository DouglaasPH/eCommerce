import axios from "axios";

const API_URL = 'https://viacep.com.br/ws/';

async function getAddress(cep: string) {
    try {
        const response = await axios.get(`${API_URL}${cep}/json/`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export { getAddress };