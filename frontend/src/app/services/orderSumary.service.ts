import { Injectable, OnInit } from "@angular/core";
import { getAllAddress } from "../requests/addressRequest";
import { getAllUserItem } from "../requests/shoppingCartRequests";
import { getProductData } from "../requests/shopRequests";
import { checkLoggined } from "../requests/loginRequests";

interface AddressInterface {
    cep: string;
    sender: string,
    contact: string,
    logradouro: string,
    number: string,
    complement: string,
    reference: string,
    neighborhood: string,
    city: string,
    uf: string,    
}

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
        discount: 0,
        shipping: "undefined",
        couponApplied: 0,
        total: 0,
        estimatedDelivery: "undefined",        
    }
    allAddress: any[] = [];
    user_id = -1;

    async updateOrderSumary() {
        const response_user_id = await checkLoggined();
        this.user_id = await response_user_id.id;

        // DEFAULT VALUE
        this.orderSumary = {
            fullPriceWithoutDiscount: 0,
            discount: 0,
            shipping: "undefined",
            couponApplied: 0,
            total: 0,
            estimatedDelivery: "undefined",
        };

        const response_all_address = await getAllAddress(this.user_id);
        this.allAddress = response_all_address;           

        const response: userItem[] = await getAllUserItem(this.user_id); 
        this.shoppingCart = response;
        
        const allProductIds: number[] = [];

        if (response.length > 0) {
            response.forEach(item => {
                if (!allProductIds.includes(item.product_id)) {
                    allProductIds.push(item.product_id);
                }
            })
            
            allProductIds.forEach(async product_id => {
                const response: Product = await getProductData(product_id);
                this.productData[product_id] = response;

                this.shoppingCart.forEach(item => {
                    if (item.product_id === product_id) {                        
                            this.orderSumary.fullPriceWithoutDiscount = Math.round((this.orderSumary.fullPriceWithoutDiscount + (item.quantity * this.productData[product_id].price)) * 100) / 100;
                            this.orderSumary.discount = Math.round((this.orderSumary.discount + ((item.quantity * this.productData[product_id].price)  - (item.quantity * this.productData[product_id].price) * ((100 - this.productData[product_id].discount_percentage) / 100))) * 100) / 100;
                            this.orderSumary.total = Math.round((this.orderSumary.total + ((item.quantity * this.productData[product_id].price) * ((100 - this.productData[product_id].discount_percentage) / 100))) * 100) / 100; 
                    }
                })
            })
        }        
    }

    async getOrderSumary() {
        await this.updateOrderSumary();
        return this.orderSumary;
    }

    async getAllProperties() {
        await this.updateOrderSumary();
        return {
            orderSumary: this.orderSumary,
            shoppingCart: this.shoppingCart,
            productData: this.productData,
            allAddress: this.allAddress,
            user_id: this.user_id,
        };
    }
    
    // check if there is an item in the shopping cart
    async checkShoppingCart() {
        await this.updateOrderSumary();

        if (this.shoppingCart.length > 0) {
            return true
        } else return false;
    }
};