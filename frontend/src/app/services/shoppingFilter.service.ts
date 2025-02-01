import { Injectable } from "@angular/core";

interface myFiltersInterface {
        size: string,
        price: string,
        brand: string,
        collection: string,
        tag: string,    
}

@Injectable({
    providedIn: 'root',
})
export class ShoppingFilterService {
    private myFilters: myFiltersInterface = {
        size: '',
        price: '',
        brand: '',
        collection: '',
        tag: '',
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