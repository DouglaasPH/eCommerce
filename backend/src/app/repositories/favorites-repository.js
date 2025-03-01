import { consult } from "../database/connection.js";

class FavoritesRepository {
    async getAllFavoritesFromUser(user_id) {
        const sql = 'SELECT favorites FROM users WHERE id = ?';
        return consult(sql, [user_id], 'Unable to query the databae.');
    }

    async updateFavoritesFromUser(newFavoritesList, user_id) {
        const sql = 'UPDATE users SET favorites = ? WHERE id = ?';
        return consult(sql, [newFavoritesList, user_id], 'Unable to query the database.');
    }

    async getAllProductFavorite(product_id) {
        const sql = 'SELECT id, description, mark, price, discount_percentage, number_of_interest_free_installments, images_path FROM sale_items WHERE id = ?';
        return consult(sql, [product_id], 'Unable to query the databae.');
    }
}

export default new FavoritesRepository();