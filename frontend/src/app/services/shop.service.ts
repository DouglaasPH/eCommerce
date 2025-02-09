import { Injectable } from "@angular/core";
import { getDatasForProductGrid, getDatasForProductGridWithFilters } from "../requests/shopRequests";
import { BehaviorSubject, Observable } from "rxjs";

interface myFiltersInterface {
    price_range: string,
    product_category: string,
    promotions: string,
    sizes: string,
    styles: string,    
}

interface Product {
    id: number,
    description: string,
    discount_percentage: number,
    images_path: string,
    number_of_interest_free_installments: number,
    price: number,
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
    private displayProducts = new BehaviorSubject<Product[]>([]);
    displayProducts$ = this.displayProducts.asObservable();
    private productId: number | undefined = undefined; 

    constructor() {        
        this.loadProducts();
    }

    private async loadProducts() {
        const products = await getDatasForProductGrid({ page: 0 });
        this.displayProducts.next(products);
    }

    setDisplayProducts(newProduct: Product[]) {
        this.displayProducts.next(newProduct);
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
            this.setDisplayProducts(newDisplay);
        } else {
            const newDisplay = await getDatasForProductGrid({ page: 0 });
            this.setDisplayProducts(newDisplay);
        }
    }

    getFilters() {
        return this.myFilters;
    }

    getDisplayProducts(): Observable<Product[]> {
        return this.displayProducts;
    }
}