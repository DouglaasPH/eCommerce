import { consult } from "../database/connection.js";

class ShoppingRepository {
    getDatasForProductGrid(page) {
        const offset = page * 9;
        const limit = offset + 9;
        const sql = 'SELECT id, description, images_path, price, discount_percentage, number_of_interest_free_installments, filters FROM sale_items LIMIT ? OFFSET ?';
        return consult(sql, [limit, offset], 'It is not possible to query data for each product for the product grid');
    }

    getDataWithFiltersForTheProductGrid(options) {
        const optionName = Object.keys(options)[0];
        const currentOption = options[optionName];
        let sql = `SELECT id, description, images_path, price, discount_percentage, number_of_interest_free_installments, filters FROM sale_items WHERE JSON_CONTAINS(filters, '["${currentOption}"]', '$.${optionName}')`;
        
        const numberOfFilters = Object.keys(options).length;
        
        if (numberOfFilters > 1) {
            for (let i = 1; i < numberOfFilters; i++) {
                const optionName = Object.keys(options)[i];
                const currentOption = options[optionName];
                const increment = ` AND JSON_CONTAINS(filters, '["${currentOption}"]', '$.${optionName}')`
                sql = sql + increment;
            }
        }
        console.log(sql);
        return consult(sql, 'Unable to query data with filters for product grid');
    }    

    getAllFilters() {
        const sql = `SELECT GROUP_CONCAT(DISTINCT JSON_KEYS(filters) SEPARATOR ',') AS filters FROM sale_items;`;
        return consult(sql, 'Unable to consult all available filters');
    }

    getTotalNumberOfPages() {
        const sql = 'SELECT COUNT(*) AS total_rows FROM sale_items';
        return consult(sql, 'Unable to check the total number of pages for the product grid');
    }
    
    getFilterOptions(option) {
        const sql = `SELECT GROUP_CONCAT(DISTINCT val ORDER BY val SEPARATOR ', ') AS ${option} FROM ( SELECT JSON_UNQUOTE(${option}) AS val FROM sale_items, JSON_TABLE(filters, '$.${option}[*]' COLUMNS (${option} JSON PATH '$')) AS jt) AS subquery`;
        return consult(sql, 'It was not possible to consult the available options for each filter');
    }
}

export default new ShoppingRepository();


