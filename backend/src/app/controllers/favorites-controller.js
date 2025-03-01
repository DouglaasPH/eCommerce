import favoritesRepository from "../repositories/favorites-repository.js";

class FavoritesController {
    async getAllFavoritesFromUser(req, res) {
        const { user_id } = req.query;
        const row = await favoritesRepository.getAllFavoritesFromUser(user_id);
        return res.json(row);
    }

    async updateFavoritesFromUser(req, res) {
        const { newFavoritesList, user_id } = req.body;
        const row = await favoritesRepository.updateFavoritesFromUser(newFavoritesList, user_id);
        return res.json(row);
    }

    async getAllProductFavorite(req, res) {
        const { product_id } = req.query;
        const row = await favoritesRepository.getAllProductFavorite(product_id);
        const product_data = {
            ...row[0],
            images_path: JSON.parse(row[0].images_path)[0]
        };
        return res.json(product_data);
    }
}

export default new FavoritesController();