import { CommonModule, DecimalPipe, NgFor } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { getDatasForProductGrid, getDatasForProductGridWithFilters } from "../../../../requests/shopRequests";

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
    constructor(private router: Router, private activatedroute: ActivatedRoute) { }
    
    sales: salesInterface[] = [];
    numberOfOtherPagesInTotal = 0;
    numberOfPages: number[] = [];
    currentPage = 1;
    displayPages: number[] = [];

    async ngOnInit() {
        this.sales = await getDatasForProductGrid();
        this.activatedroute.queryParams.subscribe(async allFilters => {
            const filterType = Object.keys(allFilters);
            let filtersWithOptions = filterType.reduce((acc: { [key: string]: any }, currentFilter: string) => {
                if (allFilters[currentFilter]) {
                    acc[currentFilter] = allFilters[currentFilter];
                }
                return acc;
            }, {});
            if (Object.keys(filtersWithOptions).length > 0) {
                this.sales = await getDatasForProductGridWithFilters(filtersWithOptions);
            } else {
                this.sales = await getDatasForProductGrid();                
            }
            this.loading();
        });             
        this.loading();
    }

    loading() {
        this.numberOfOtherPagesInTotal = Math.ceil(this.sales.length / 9);
        this.numberOfPages = Array.from({ length: this.numberOfOtherPagesInTotal }, (_, i) => i + 1);            
        this.displayPages = Array.from(this.numberOfPages, (_, i) => this.numberOfPages[i] >= this.currentPage && this.numberOfPages[i] - this.currentPage < 3 ? this.numberOfPages[i] : null).filter(page => page !== null);
    }

    clickOnTheProduct(productId: number) {
        this.router.navigate(['/shop/product', productId]);
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