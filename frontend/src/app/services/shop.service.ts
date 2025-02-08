import { Injectable } from "@angular/core";
import { getDatasForProductGrid, getDatasForProductGridWithFilters } from "../requests/shopRequests";

interface myFiltersInterface {
    price_range: string,
    product_category: string,
    promotions: string,
    sizes: string,
    styles: string,    
}

@Injectable({
    providedIn: 'root',
})
export class shopService {
    private myFilters = {
        price_range: "",
        product_category: "",
        promotions: "",
        sizes: "",
        styles: "",
};
    private displayProducts: [] = [];
    private productId: number | undefined = undefined; 

    private async loadProducts() {
        const products = await getDatasForProductGrid({ page: 0 });
        this.displayProducts = products;
        console.log("products: ", this.displayProducts)
    }

    constructor() {
        this.loadProducts();
    }    

    setProductId(data: number | undefined) {
        this.productId = data;
    }

    getProductId() {
        return this.productId;  
    }
    
    async setFilter(datas: Partial<myFiltersInterface>) {
        const filterType = Object.keys(datas);
        const key = filterType[0] as keyof myFiltersInterface;
        this.myFilters = {
            ...this.myFilters,
            [key]: datas[key],
        };

        let selectedFilters: { [key: string]: string } = {};
        const myFiltersType: (keyof myFiltersInterface)[] = Object.keys(this.myFilters) as (keyof myFiltersInterface)[];
        myFiltersType.map(filterType => {
            if (this.myFilters[filterType]) {
                selectedFilters = {
                    ...selectedFilters,
                    [filterType]: this.myFilters[filterType]
                }
            }
        })


        if (Object.keys(selectedFilters).length > 0) {
            const newDisplay = await getDatasForProductGridWithFilters(selectedFilters);
            this.displayProducts = newDisplay;
        } else {
            const newDisplay = await getDatasForProductGrid({ page: 0 });
            this.displayProducts = newDisplay;            
        }
    }

    getFilters() {
        return this.myFilters;
    }

    getDisplayProducts() {
        return this.displayProducts;
    }
}