import { Injectable } from "@angular/core";

interface myFiltersInterface {
        size: string,
        prices: string,
        brands: string,
        collections: string,
        tags: string[],    
}

@Injectable({
    providedIn: 'root',
})
export class ShoppingFilterService {
    private myFilters: myFiltersInterface = {
        size: '',
        prices: '',
        brands: '',
        collections: '',
        tags: [],
    };

    setFilter(datas: Partial<myFiltersInterface>) {
        const filterType = Object.keys(datas);

        if (filterType.includes('tags')) {
            this.myFilters.tags.push(...datas.tags!);
        } else {
            const key = filterType[0] as keyof myFiltersInterface;
            this.myFilters = {
                ...this.myFilters,
                [key]: datas[key],
            }
        }
    }

    getFilters() {
        return this.myFilters;
    }
}