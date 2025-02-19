import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { OrderSumaryService } from "../../services/orderSumary.service";

@Component({
    selector: 'order-sumary',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './orderSumary.component.html',
    styleUrl: './orderSumary.component.scss'
})
export class orderSumary implements OnInit {
    constructor(private orderSumaryService: OrderSumaryService, private router: Router) {}

    browsingHistory: string[] = [];
    currentPath: string = '';
    shoppingCartLength: number = 0;
    orderSumary = {
        fullPriceWithoutDiscount: 0,
        couponCode: '',
        discount: 0,
        shipping: "undefined",
        couponDiscount: 0,
        total: 0,
        estimatedDelivery: "undefined",
    };

    async ngOnInit(): Promise<void> {
        this.browsingHistory = JSON.parse(sessionStorage.getItem('browsingHistory') || '[]');
        this.currentPath = this.browsingHistory[this.browsingHistory.length - 1];
        const response = await this.orderSumaryService.getOrderSumary();
        this.orderSumary = response;
        const response_process_purchase = await this.orderSumaryService.getData();
        this.shoppingCartLength = response_process_purchase;
        await this.validateCoupon();
    }       

    async validateCoupon() {
        if (this.orderSumary.couponCode !== '' && this.orderSumary.couponDiscount === 0) {
            await this.orderSumaryService.confirmCoupon(this.orderSumary.couponCode);
        } else return;
    }    

    onContinueShopping() {
        let lastRoutesOnTheWayShop: string[] = [];

        this.browsingHistory.forEach(path => {
            if (path.includes('/shop') && !path.includes('/shop/product')) {
                lastRoutesOnTheWayShop.push(path);
            }
        });

        const lastRoute: string = lastRoutesOnTheWayShop[lastRoutesOnTheWayShop.length - 1];

        if (lastRoute === '/shop') {
            this.router.navigate([lastRoute]);
        } else {
            const paramsString = lastRoute.split('?')[1]; 
            const searchParams = new URLSearchParams(paramsString);
            const paramsObject: Record<string, string> = {};
            searchParams.forEach((value, key) => {
                paramsObject[key] = value;
            });
            this.router.navigate(['/shop'], { queryParams: paramsObject });            
        }
    }

    async onProceedToCheckout() {
        if (this.shoppingCartLength > 0) {
            sessionStorage.setItem('proceedToChooseAddress', 'true');
            this.router.navigate(['shopping-cart/address']);
        } else return;
    }
    
    async onContinueToShipping() {
        const chosenAddress = this.orderSumaryService.chosenAddress; 
        if (chosenAddress > -1) {
            sessionStorage.setItem('continueToShipping', 'true');
            this.router.navigate(['shopping-cart/address/shipping']);
        }
    }    

    continueToPayment() {
        const chosenDelivery = this.orderSumaryService.chosenDelivery; 
        if (chosenDelivery > -1) {
            sessionStorage.setItem('continueToPayment', 'true');
            this.router.navigate(['shopping-cart/address/shipping/payment']);
        } else return;
    }    

    continueToConfirmation() {
        const choosePaymentMethod = this.orderSumaryService.choosePaymentMethod;
        if (choosePaymentMethod !== '') {
            // TODO
        } else return;
    }        
}