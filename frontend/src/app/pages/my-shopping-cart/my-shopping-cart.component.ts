import { Component, OnInit } from "@angular/core";
import { FooterBar } from "../../shared/footer-bar/footer-bar.component";
import { navBar } from "../../shared/nav-bar/nav-bar.component";
import { CommonModule } from "@angular/common";
import { removeItem, updateItem } from "../../requests/shoppingCartRequests";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { OrderSumaryService } from "../../services/orderSumary.service";

interface Product {
    id: number;
    description: string;
    mark: string;
    price: number;
    images_path: string[];
    size_by_quantity: { [key: string]: string }
    discount_percentage: number
}

@Component({
    selector: 'my-shopping-cart',
    standalone: true,
    imports: [CommonModule, FormsModule, FooterBar, navBar],
    templateUrl: './my-shopping-cart.component.html',
    styleUrl: './my-shopping-cart.component.scss',
})
export class MyShoppingCart implements OnInit {
    constructor(private router: Router, private orderSumaryService: OrderSumaryService) { }
    
    browsingHistory: string[] = JSON.parse(sessionStorage.getItem('browsingHistory') || '[]');
    
    shoppingCart: any[] = [];
    productData: Product[] = [];
    objectKeys = Object.keys;
    orderSumary = {
        fullPriceWithoutDiscount: 0,
        discount: 0,
        shipping: "undefined",
        couponApplied: 0,
        total: 0,
        estimatedDelivery: "undefined",
    };


    async ngOnInit(): Promise<void> {
        await this.updateProperties();
    }

    async updateProperties() {
        const response = await this.orderSumaryService.getAllProperties();
        this.shoppingCart = response.shoppingCart;
        this.productData = response.productData;
        this.orderSumary = response.orderSumary;
    }

    async updateItem(datas: { newSize: string, currentSize: string } | {  currentQuantity: number, type: string, maxLength: { [key: string]: string}, currentSize: string } | { remove: string}, id: number) {
        if ("newSize" in datas) {
            try {
                const response = await updateItem({ size: datas.newSize }, id);
            } catch (error) {
                console.log(error);
            }
        } else if ("currentQuantity" in datas) {
            const keys = Object.keys(datas.maxLength);
            let maxLength = 0;

            keys.forEach(size => {
                if (size === datas.currentSize) {
                    maxLength = Number(datas.maxLength[size]);
                }
            })            


            this.shoppingCart.forEach(object => {
                if (object.id === id) {
                    if (datas.type === 'increment' && datas.currentQuantity < maxLength) object.quantity++;
                    else if (datas.type === 'decrement' && datas.currentQuantity - 1 > 0) object.quantity--;
                    else return;
                }
            })
            try {
                if (datas.type === 'increment' && datas.currentQuantity < maxLength) {
                    const response = await updateItem({ quantity: datas.currentQuantity + 1 }, id);
                } else if (datas.type === 'decrement' && datas.currentQuantity - 1 > 0) {
                    const response = await updateItem({ quantity: datas.currentQuantity - 1 }, id);
                } else return;
            } catch (error) {
                console.log(error);
            }
        } else if ('remove' in datas) {
            try {
                const response = await removeItem(id);
                this.shoppingCart = this.shoppingCart.filter(item => item.id !== id);
            } catch (error) {
                console.log(error);
            }
        }
        await this.updateProperties();
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

    onSubmitCoupomCode() {
        // TODO
        console.log("submit coupom code");
    }

    async onProceedToCheckout() {
        if (this.shoppingCart.length > 0) {
            sessionStorage.setItem('proceedToChooseAddress', 'true');
            this.router.navigate(['shopping-cart/address']);
        } else return;
    }
};