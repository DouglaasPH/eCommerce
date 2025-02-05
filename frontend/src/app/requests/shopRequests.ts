import axios from "axios";

const API_URL = 'http://localhost:3000';

async function getAllFilters() {
    try {
        const response = await axios.get(`${API_URL}/getAllFilters`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function getAllFilterOptions(datas: string[]) {
    try {
        const response = await axios.get(`${API_URL}/getAllFilterOptions`, {
            params: {
                options: datas,
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export { getAllFilters, getAllFilterOptions };