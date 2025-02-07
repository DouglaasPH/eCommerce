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
    
    getFilterOptions(option) {
        const sql = `SELECT GROUP_CONCAT(DISTINCT val ORDER BY val SEPARATOR ', ') AS ${option} FROM ( SELECT JSON_UNQUOTE(${option}) AS val FROM sale_items, JSON_TABLE(filters, '$.${option}[*]' COLUMNS (${option} JSON PATH '$')) AS jt) AS subquery`;
        return consult(sql, 'It was not possible to consult the available options for each filter');
    }

    getFiltersWithSelectedFilters(filters) {

        let sql = 'SELECT ';
        let allConditions = '';
        const allFilters = Object.keys(filters);        
        let filtersWithoutOptions = [];
        let filtersWithOptions = [];

        allFilters.map(filtro => {
            if (filters[filtro].length > 0) {
                filtersWithOptions.push(filtro);
            } else {
                filtersWithoutOptions.push(filtro);
            }
        });        
        

        for (let i = 0; i < filtersWithOptions.length; i++) {
            let AND = ' AND';
            let WHERE = ' WHERE';
            let CONDITION = ` JSON_CONTAINS(filters, '["${filters[filtersWithOptions[i]]}"]', '$.${filtersWithOptions[i]}')`;

            if (i === 0) {
                allConditions = WHERE + CONDITION;
            } else if (i > 0) {
                allConditions = allConditions + AND + CONDITION;                        
            } 
        }

        for (let i = 0; i < filtersWithoutOptions.length; i++) {
            let SELECTION = `(SELECT GROUP_CONCAT(DISTINCT JSON_UNQUOTE(${filtersWithoutOptions[i]}) ORDER BY ${filtersWithoutOptions[i]} SEPARATOR ', ') FROM sale_items, JSON_TABLE(filters, '$.${filtersWithoutOptions[i]}[*]' COLUMNS (${filtersWithoutOptions[i]} JSON PATH '$')) AS jt `;
            const closeSelection = `) AS ${filtersWithoutOptions[i]} `;
            const COMMA = ', ';

            sql = sql + SELECTION + allConditions + closeSelection;

            if (i < filtersWithoutOptions.length - 1) {
                sql = sql + COMMA;                
            }                
        }   
            
        return consult(sql, 'Unable to check filters based on chosen filters')
    }
    
    getTotalNumberOfPages() {
        const sql = 'SELECT COUNT(*) AS total_rows FROM sale_items';
        return consult(sql, 'Unable to check the total number of pages for the product grid');
    }    
}

export default new ShoppingRepository();