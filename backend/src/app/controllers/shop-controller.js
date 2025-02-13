import shoppingRepository from "../repositories/shop-repository.js";

class ShopController {
    async getDatasForProductGrid(req, res) {
        const row = await shoppingRepository.getDatasForProductGrid();
        return res.json(row);
    }

    async getDatasForProductGridWithFilters(req, res) {
        let { filters } = req.query;
        const row = await shoppingRepository.getDatasForProductGridWithFilters(filters);
        return res.json(row);
    }    

    async getTotalNumberOfPages(req, res) {
        const row = await shoppingRepository.getTotalNumberOfPages();
        const numberOfPages = Math.ceil(row[0].total_rows / 9);
        return res.json(numberOfPages);
    }

    async getAllFilters(req, res) {
        const row = await shoppingRepository.getAllFilters();
        const filters = JSON.parse(row[0].filters);        
        return res.json(filters);
    }

    async getAllFilterOptions(req, res) {
        const { options } = req.query;

        let result = {};
        for (let i = 0; i < options.length; i++) {
            const currentOption = options[i];
            const row = await shoppingRepository.getAllFilterOptions(options[i]);
            const requestValue = row[0][currentOption];
            const array = requestValue.split(', ');
            result = {
                ...result,
                [options[i]]: array,
            };
        }
        return res.json(result);
    }

    async getFiltersWithSelectedFilters(req, res) {
        const { filters } = req.query;
        const row = await shoppingRepository.getFiltersWithSelectedFilters(filters);
        const nameFilters = Object.keys(row[0]);
        let result = {};
        nameFilters.map(filter => {
            const object = row[0];
            if (object[filter] !== null) {
                if (object[filter].includes(',')) {
                    const array = object[filter].split(', ');
                    result = {
                        ...result,
                        [filter]: array,
                    };
                } else {
                    result = {
                        ...result,
                        [filter]: [object[filter]],
                    };
                };
            } else {
                result = {
                    ...result,
                    [filter]: [''],
                };
            };
        })
        return res.json(result);
    }

    async getProductData(req, res) {
        const { productId } = req.query;
        let row = await shoppingRepository.getProductData(productId);
        const images_path = JSON.parse(row[0].images_path);  
        const size_by_quantity = JSON.parse(row[0].size_by_quantity);  
        row = {
            ...row[0],
            images_path,
            size_by_quantity
        };
        return res.json(row);
    }
}

export default new ShopController();