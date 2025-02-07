import { Injectable } from "@angular/core";

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
export class ShoppingFilterService {
    private myFilters: myFiltersInterface = {
        price_range: '',
        product_category: '',
        promotions: '',
        sizes: '',
        styles: '',
};

    setFilter(datas: Partial<myFiltersInterface>) {
        const filterType = Object.keys(datas);
        const key = filterType[0] as keyof myFiltersInterface;
        this.myFilters = {
            ...this.myFilters,
            [key]: datas[key],
        };
    }

    getFilters() {
        return this.myFilters;
    }
}