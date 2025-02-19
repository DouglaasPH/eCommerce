import { Injectable } from "@angular/core";
import { getAllUserItem } from "../requests/shoppingCartRequests";
import { getProductData } from "../requests/shopRequests";
import { checkLoggined } from "../requests/loginRequests";
import { confirmCoupon } from "../requests/couponsRequests";

interface Product {
    id: number;
    description: string;
    mark: string;
    price: number;
    images_path: string[];
    size_by_quantity: { [key: string]: string }
    discount_percentage: number
}

interface userItem {
    product_id: number
    quantity: number
}

@Injectable({
    providedIn: 'root',
})
export class OrderSumaryService {
    shoppingCart: any[] = [];
    productData: Product[] = [];
    orderSumary = {
        fullPriceWithoutDiscount: 0,
        couponCode: '',
        discount: 0,
        shipping: "undefined",
        couponDiscount: 0,
        total: 0,
        estimatedDelivery: "undefined",        
    }
    user_id = -1;
    allProductIds: number[] = [];

    chosenAddress = -1;
    chosenDelivery = -1;
    choosePaymentMethod = '';

    async updateOrderSumary() {
        const response_user_id = await checkLoggined();
        this.user_id = await response_user_id.id;

        // DEFAULT VALUE
        this.orderSumary = {
            fullPriceWithoutDiscount: 0,
            couponCode: '',
            discount: 0,
            shipping: "undefined",
            couponDiscount: 0,
            total: 0,
            estimatedDelivery: "undefined",
        };        

        const response: userItem[] = await getAllUserItem(this.user_id); 
        this.shoppingCart = response;
        
        if (response.length > 0) {
            response.forEach(item => {
                if (!this.allProductIds.includes(item.product_id)) {
                    this.allProductIds.push(item.product_id);
                }
            })
            
            this.allProductIds.forEach(async product_id => {
                const response: Product = await getProductData(product_id);
                this.productData[product_id] = response;

                this.shoppingCart.forEach(item => {
                    if (item.product_id === product_id) {                        
                        this.orderSumary.fullPriceWithoutDiscount = Math.round((this.orderSumary.fullPriceWithoutDiscount + (item.quantity * this.productData[product_id].price)) * 100) / 100;
                        this.orderSumary.discount = Math.round((this.orderSumary.discount + ((item.quantity * this.productData[product_id].price) - (item.quantity * this.productData[product_id].price) * ((100 - this.productData[product_id].discount_percentage) / 100))) * 100) / 100;
                        this.orderSumary.total = Math.round((this.orderSumary.total + ((item.quantity * this.productData[product_id].price) * ((100 - this.productData[product_id].discount_percentage) / 100))) * 100) / 100; 
                    }
                })                
            })

            this.getCoupon();
        }
    }

    async getOrderSumary() {
        await this.updateOrderSumary();
        return this.orderSumary;
    }

    async getData() {
        return this.shoppingCart.length;
    }

    async confirmCoupon(coupon_code: string) {
        const response = await confirmCoupon(coupon_code);

        if (response.length > 0) {
            if (response[0].quantity_available > 0) {
                sessionStorage.setItem('usingTheCoupon', `["${coupon_code}", ${response[0].discount}]`);
                this.orderSumary.couponCode = coupon_code;
                this.orderSumary.couponDiscount = response[0].discount;
                this.orderSumary.total = this.orderSumary.total - response[0].discount;                
            } else {
                sessionStorage.setItem('usingTheCoupon', `["", 0]`);
                this.orderSumary.couponCode = "";
                this.orderSumary.couponDiscount = 0;
            }
        } else {
            sessionStorage.setItem('usingTheCoupon', `["", 0]`);            
            this.orderSumary.couponCode = "";
            this.orderSumary.couponDiscount = 0;
        }
    }

    async getCoupon() {
        const str = sessionStorage.getItem('usingTheCoupon');
        const arr = JSON.parse(str!);
        this.orderSumary.couponCode = arr[0];
        this.orderSumary.couponDiscount = arr[1];
    }

    setChooseAddress(index: number) {
        this.chosenAddress = index;
    }

    setChosenDelivery(index: number) {
        this.chosenDelivery = index;
    }

    setChosenPayment(paymentMethod: string) {
        this.choosePaymentMethod = paymentMethod;
    }    
};