import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
    selector: 'filters',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './filters-component.component.html',
    styleUrl: './filters-component.component.scss',
})
export class FiltersComponent {
    size = '';
    price = '';
    brand = '';
    collection = '';
    tags: string[] = [];

    filterStatus = {
        sizeOn: false,
        priceOn: false,
        brandOn: false,
        collectionOn: false,
        tagsOn: false,        
    }

    changeSize(newSize: string) {
        if (this.size === newSize) {
            this.size = '';
            this.filterStatus.sizeOn = false;
        } else {
            this.size = newSize;
            this.filterStatus.sizeOn = true;
        }
        console.log(this.size);        
    }

    changePrice(newPrice: string) {
        if (this.price === newPrice) {
            this.price = '';
            this.filterStatus.priceOn = false;
        } else {
            this.price = newPrice;
            this.filterStatus.priceOn = true;
        }
        console.log(this.price);
    }

    changeBrand(newBrand: string) {
        if (this.brand === newBrand) {
            this.brand = '';
            this.filterStatus.brandOn = false;
        } else {
            this.brand = newBrand;
            this.filterStatus.brandOn = true;
        }        
        console.log(this.brand);        
    }

    changeCollection(newCollection: string) {
        if (this.collection === newCollection) {
            this.collection = '';
            this.filterStatus.collectionOn = false;
        } else {
            this.collection = newCollection;
            this.filterStatus.collectionOn = true;
        }
        console.log(this.collection);        
    }

    changeTags(newTag: string) {
        if (this.tags.includes(newTag)) {
            this.tags = this.tags.filter(tag => tag !== newTag);
            if (this.tags.length > 0) {
                this.filterStatus.tagsOn = true;                
            } else {
                this.filterStatus.tagsOn = false;
            };
        } else {
            this.tags.push(newTag);
            this.filterStatus.tagsOn = true;
        }        
        console.log(this.tags);
    }
}