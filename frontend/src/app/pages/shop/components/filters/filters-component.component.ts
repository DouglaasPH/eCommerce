import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ShoppingFilterService } from "../../../../services/shoppingFilter.service";

interface myFiltersInterface {
    size: string,
    price: string,
    brand: string,
    collection: string,
    tag: string,    
};

@Component({
    selector: 'filters',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './filters-component.component.html',
    styleUrl: './filters-component.component.scss',
})
export class FiltersComponent {
    constructor(private shoppingfilterservice: ShoppingFilterService) {}

    myFilters = {
        size: '',
        price: '',
        brand: '',
        collection: '',
        tag: '',
    };

    filterStatus = {
        chosenSize: false,
        chosenPrice: false,
        chosenBrand: false,
        chosenCollection: false,
        chosenTag: false,
    };

    changeNewFilter(datas: Partial<myFiltersInterface>) {
        const filterType = Object.keys(datas);
        const key = filterType[0] as keyof myFiltersInterface;
        
        if (this.myFilters[key] === '') {
            this.myFilters = {
                ...this.myFilters,
                [key]: datas[key],
            };            
            this.shoppingfilterservice.setFilter({ [key]: datas[key] });                                    
        } else {
            this.myFilters = {
                ...this.myFilters,
                [key]: '',
            };                        
            this.shoppingfilterservice.setFilter({ [key]: '' });                                    
        }

        switch (key) {
            case 'size':
                this.filterStatus.chosenSize = !this.filterStatus.chosenSize;
                break;
            case 'price':
                this.filterStatus.chosenPrice = !this.filterStatus.chosenPrice;
                break;
            case 'brand':
                this.filterStatus.chosenBrand = !this.filterStatus.chosenBrand;
                break;
            case 'collection':
                this.filterStatus.chosenCollection = !this.filterStatus.chosenCollection;
                break;
            case 'tag':
                this.filterStatus.chosenTag = !this.filterStatus.chosenTag;
                break;            
        
            default:
                break;
        }   
    }
}