import { CommonModule, NgFor } from "@angular/common";
import { Component } from "@angular/core";

@Component({
    selector: 'shop',
    standalone: true,
    imports: [NgFor, CommonModule],
    templateUrl: './shop.component.html',
    styleUrl: './shop.component.scss',
})  
export class Shop {
    sales = [
        { item: "Rounded Red Hat", images: ['../../../../../assets/shop/sales/Rounded Red Hat/rounded-red-hat-01.png'], price: '$8.00' },
        { item: "Linen-blend Shirt", images: ['../../../../../assets/shop/sales/Linen-blend Shirt/linen-blend-shirt-01.png'], price: '$17.00' },
        { item: "Long-sleeve Coat", images: ['../../../../../assets/shop/sales/Long-sleeve Coat/long-sleeve-coat-01.png'], price: '$106.00' },
        { item: "Boxy Denim Hat", images: ['../../../../../assets/shop/sales/Boxy Denim Hat/boxy-denim-hat-01.png'], price: '$25.00' },
        { item: "Linen Plain Top", images: ['../../../../../assets/shop/sales/Linen Plain Top/linen-plain-top-01.png'], price: '$25.00' },
        { item: "Oversized T-shirt", images: ['../../../../../assets/shop/sales/Oversized T-shirt/oversized-t-shirt-01.png'], price: '$14.00' },
        { item: "Polarised Sunglasses", images: ['../../../../../assets/shop/sales/Polarised Sunglasses/polarised-sunglasses-01.png'], price: '$21.00' },
        { item: "Rockstar Jacket", images: ['../../../../../assets/shop/sales/Rockstar Jacket/rockstar-jacket-01.png'], price: '$22.00' },
        { item: "Dotted Black Dress", images: ['../../../../../assets/shop/sales/Dotted Black Dress/dotted-black-dress-01.png'], price: '$20.00' },
        { item: "Dotted Black Dress", images: ['../../../../../assets/shop/sales/Dotted Black Dress/dotted-black-dress-01.png'], price: '$20.00' },
    ];
    numberOfOtherPagesInTotal = Math.ceil(this.sales.length / 9);
    numberOfPages = Array.from({ length: this.numberOfOtherPagesInTotal }, (_, i) => i + 1);
    currentPage = 1;
    displayPages = Array.from(this.numberOfPages, (_, i) => this.numberOfPages[i] >= this.currentPage && this.numberOfPages[i] - this.currentPage < 3 ? this.numberOfPages[i] : null).filter(page => page !== null);     

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