import shoppingRepository from "../repositories/shop-repository.js";

class ShopController {
    async productGrid(req, res) {
        const { page } = req.query;
        const row = await shoppingRepository.getDatasForProductGrid(page);
        let products = [];
        row.forEach(data => {
            const dataP = JSON.parse(data.filters);
            const product = {
                ...data,
                filters: dataP
            }; 
            products.push(product);
        });
        return res.json(products);
    }

    async productGridWithFilters(req, res) {
        let { filters }  = req.body;
        const row = await shoppingRepository.getDataWithFiltersForTheProductGrid(filters);
        return res.json(row);
    }    

    async totalPages(req, res) {
        const row = await shoppingRepository.getTotalNumberOfPages();
        const numberOfPages = Math.ceil(row[0].total_rows / 9);
        return res.json(numberOfPages);
    }

    async allFilters(req, res) {
        const row = await shoppingRepository.getAllFilters();
        const filters = row[0].filters;        
        return res.json(filters);
    }

    async FilterOptions(req, res) {
        const { options } = req.body;
        let result = {};
        for (let i = 0; i < options.length; i++) {
            const currentOption = options[i];
            const row = await shoppingRepository.getFilterOptions(options[i]);
            const requestValue = row[0][currentOption];
            const array = requestValue.split(', ');
            result = {
                ...result,
                [options[i]]: array,
            };
        }
        return res.json(result);
    }
}

export default new ShopController();