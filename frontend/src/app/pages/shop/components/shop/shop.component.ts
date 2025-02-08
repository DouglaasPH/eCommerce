import { CommonModule, DecimalPipe, NgFor } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { shopService } from "../../../../services/shop.service";

interface salesInterface {
    id: number,
    description: string,
    discount_percentage: number,
    images_path: string,
    number_of_interest_free_installments: number,
    price: number,
}

@Component({
    selector: 'shop',
    standalone: true,
    imports: [NgFor, CommonModule, DecimalPipe],
    templateUrl: './shop.component.html',
    styleUrl: './shop.component.scss',
})  
export class Shop implements OnInit {
    constructor(private shopservice: shopService) { }
    
    sales: salesInterface[] = [];

    numberOfOtherPagesInTotal = Math.ceil(this.sales.length / 9);
    numberOfPages = Array.from({ length: this.numberOfOtherPagesInTotal }, (_, i) => i + 1);
    currentPage = 1;
    displayPages = Array.from(this.numberOfPages, (_, i) => this.numberOfPages[i] >= this.currentPage && this.numberOfPages[i] - this.currentPage < 3 ? this.numberOfPages[i] : null).filter(page => page !== null);     

    async ngOnInit() {
        this.sales = this.shopservice.getDisplayProducts();
        console.log(this.sales)

        this.numberOfOtherPagesInTotal = Math.ceil(this.sales.length / 9);
        this.numberOfPages = Array.from({ length: this.numberOfOtherPagesInTotal }, (_, i) => i + 1);
        this.currentPage = 1;
        this.displayPages = Array.from(this.numberOfPages, (_, i) => this.numberOfPages[i] >= this.currentPage && this.numberOfPages[i] - this.currentPage < 3 ? this.numberOfPages[i] : null).filter(page => page !== null);     
    }

    clickOnTheProduct(productId: number) {
        this.shopservice.setProductId(productId);
    }

    changePage(nextPage: number) {
        this.currentPage = nextPage;
        this.displayPages = Array.from(this.numberOfPages, (_, i) => this.numberOfPages[i] >= this.currentPage && this.numberOfPages[i] - this.currentPage < 3 ? this.numberOfPages[i] : null).filter(page => page !== null);
    }

    passPage() {
        this.currentPage = this.currentPage + 3 <= this.numberOfPages.length ? this.currentPage + 3 : this.currentPage + 1 <= this.numberOfPages.length ? this.currentPage + 1 : this.currentPage;   
        this.displayPages = Array.from(this.numberOfPages, (_, i) => this.numberOfPages[i] >= this.currentPage && this.numberOfPages[i] - this.currentPage < 3 ? this.numberOfPages[i] : null).filter(page => page !== null);
    }
    backPage() {
        this.currentPage = this.currentPage - 1 >= 1 ? this.currentPage - 1 : 1 ;
        this.displayPages = Array.from(this.numberOfPages, (_, i) => this.numberOfPages[i] >= this.currentPage && this.numberOfPages[i] - this.currentPage < 3 ? this.numberOfPages[i] : null).filter(page => page !== null);        
    }
}