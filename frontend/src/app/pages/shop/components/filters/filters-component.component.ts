import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ShoppingFilterService } from "../../../../services/shoppingFilter.service";
import { getAllFilterOptions, getAllFilters } from "../../../../requests/shopRequests";

@Component({
    selector: 'filters',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './filters-component.component.html',
    styleUrl: './filters-component.component.scss',
})
export class FiltersComponent implements OnInit {
    constructor(private shoppingfilterservice: ShoppingFilterService) { }

    allFilters: string[] = [];
    allFilterOptions: object = {}; 

    myFilters: { [key: string]: string } = {
        sizes: '',
        price_range: '',
        product_category: '',
        promotions: '',
        styles: '',
    };

    filterStatus: { [key: string]: boolean } = {
        sizes: false,
        price_range: false,
        product_category: false,
        promotions: false,
        styles: false,
    };

    filtersName: { [key: string]: string } = {
        price_range: 'Price Range',
        product_category: 'Product Category',
        promotions: 'Promotions',
        sizes: 'Sizes',
        styles: 'Styles'
    };

    async ngOnInit() {
        try {
            this.allFilters = await getAllFilters();
            this.allFilterOptions = await getAllFilterOptions(this.allFilters);            
        } catch (error) {
            window.location.reload();
        }
    }

    changeNewFilter(key: keyof { [key: string]: string } | string, value: string) {        
        if (this.myFilters[key] === '') {
            this.myFilters = {
                ...this.myFilters,
                [key]: value,
            };            
            this.shoppingfilterservice.setFilter({ [key]: key });
        } else {
            this.myFilters = {
                ...this.myFilters,
                [key]: '',
            };                        
            this.shoppingfilterservice.setFilter({ [key]: '' });                                    
        }

        this.filterStatus[key] = !this.filterStatus[key];
    }
}