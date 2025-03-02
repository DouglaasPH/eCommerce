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

async function getFiltersWithSelectedFilters(datas: { [key: string]: string}) {
    try {
        const response = await axios.get(`${API_URL}/getFiltersWithSelectedFilters`, {
            params: {
                filters: datas
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function getDatasForProductGridWithFilters(datas: any) {
    try {
        const response = await axios.get(`${API_URL}/getDatasForProductGridWithFilters`, {
            params: {
                filters: datas
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function getDatasForProductGrid() {
    try {
        const response = await axios.get(`${API_URL}/getDatasForProductGrid`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function getProductData(datas: any) {
    console.log(datas);
    try {
        const response = await axios.get(`${API_URL}/getProductData`, {
            params: {
                productId: datas
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export { getAllFilters, getAllFilterOptions, getFiltersWithSelectedFilters, getDatasForProductGridWithFilters, getDatasForProductGrid, getProductData };