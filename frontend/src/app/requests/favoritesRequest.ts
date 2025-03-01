import axios from "axios";

const API_URL = 'http://localhost:3000';

async function getAllFavoritesFromUser(user_id: number) { 
    try {
        const response = await axios.get(`${API_URL}/getAllFavoritesFromUser`, {
            params: {
                user_id
            }
        });
        return response.data[0];
    } catch (error) {
        console.log(error);
    }    
}

async function updateFavoritesFromUser(newFavoritesList: object, user_id: number) {
    try {
        const response = await axios.put(`${API_URL}/updateFavoritesFromUser`, {
            newFavoritesList: JSON.stringify(newFavoritesList),
            user_id
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function getAllProductFavorite(product_id: number) { 
    try {
        const response = await axios.get(`${API_URL}/getAllProductFavorite`, {
            params: {
                product_id
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }    
}

export { getAllFavoritesFromUser, updateFavoritesFromUser, getAllProductFavorite };