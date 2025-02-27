import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { OrderSumaryService } from "../../services/orderSumary.service";
import { addOrder, addOrderItem, addPayment, getOrderIdForAddPaymentRequest, removeItemFromShoppingCart } from "../../requests/finalizePurchaseRequests";

@Component({
    selector: 'order-sumary',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './orderSumary.component.html',
    styleUrl: './orderSumary.component.scss'
})
export class orderSumary implements OnInit {
    constructor(private orderSumaryService: OrderSumaryService, private router: Router) { }

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

    backgroundDivForLoadOrConfirm = false;
    onLoading = false;
    onConfirm = false;

    async ngOnInit(): Promise<void> {
        this.orderSumaryService.updateOrderSumaryCall$.subscribe(async (message) => {
            const response = this.orderSumaryService.orderSumary;
            this.orderSumary = response;
            const response_process_purchase = this.orderSumaryService.shoppingCart.length;
            this.shoppingCartLength = response_process_purchase;
            await this.validateCoupon();
        })

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

    async continueToConfirmation() {
        const choosePaymentMethod = this.orderSumaryService.choosePaymentMethod;
        if (choosePaymentMethod !== '') {
            this.backgroundDivForLoadOrConfirm = true;            
            this.onLoading = true;

            try {
                await this.finalizeToPurchase();
                this.onLoading = false;

                setTimeout(() => {
                    this.onConfirm = true;       
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 500);
                }, 500);

            } catch (error) {
                console.log(error);
            }

        } else return;
    }
    


    async finalizeToPurchase() {
        const dataForAddOrderRequest = {
            user_id: this.orderSumaryService.user_id,
            status: 'pending',
            address: sessionStorage.getItem('address'),
            subtotal: this.orderSumary.fullPriceWithoutDiscount,
            shipping_price: 0,
            discount: this.orderSumary.discount + this.orderSumary.couponDiscount,
            total: this.orderSumary.total,
            coupon_applied: this.orderSumary.couponCode,
        };

        await addOrder(dataForAddOrderRequest);        

        const order_id = await getOrderIdForAddPaymentRequest(this.orderSumaryService.user_id);

        const dataForAddPaymentRequest = {
            order_id: await order_id.id,
            payment_method: this.orderSumaryService.choosePaymentMethod,
            status: 'pending',
        }

        await addPayment(dataForAddPaymentRequest);

        const removeItem = this.orderSumaryService.shoppingCart;

        removeItem.forEach(async item => await removeItemFromShoppingCart(item.id));


        this.orderSumaryService.allProductIds.forEach(product_id => {
            this.orderSumaryService.shoppingCart.forEach(async item => {
                if (product_id === item.product_id) {
                    const dataForAddOrderItemRequest = {
                        order_id: order_id.id,
                        product_id: product_id,
                        quantity: item.quantity,
                        size: item.size,
                        price: Math.round((item.quantity * this.orderSumaryService.productData[product_id].price) * ((100 - this.orderSumaryService.productData[product_id].discount_percentage) / 100) * 100) / 100,
                    }

                    await addOrderItem(dataForAddOrderItemRequest);                    
                } else return
            })
        })         
        this.orderSumaryService.clearOrderSumary();
    }
}