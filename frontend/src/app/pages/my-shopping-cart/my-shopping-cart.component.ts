import { Component, OnInit } from "@angular/core";
import { FooterBar } from "../../shared/footer-bar/footer-bar.component";
import { navBar } from "../../shared/nav-bar/nav-bar.component";
import { CommonModule } from "@angular/common";
import { getAllUserItem, removeItem, updateItem } from "../../requests/shoppingCartRequests";
import { getProductData } from "../../requests/shopRequests";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

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

@Component({
    selector: 'my-shopping-cart',
    standalone: true,
    imports: [CommonModule, FormsModule, FooterBar, navBar],
    templateUrl: './my-shopping-cart.component.html',
    styleUrl: './my-shopping-cart.component.scss',
})
export class MyShoppingCart implements OnInit {
    constructor(private router: Router) { }
    
    browsingHistory: string[] = JSON.parse(sessionStorage.getItem('browsingHistory') || '[]');
    
    shoppingCart: any[] = [];
    productData: Product[] = [];
    objectKeys = Object.keys;
    orderTotal = 0;


    async ngOnInit(): Promise<void> {
        const response: userItem[] = await getAllUserItem(1); 
        this.shoppingCart = response;
        
        const allProductIds: number[] = [];

        if (response.length > 0) {
            response.forEach(item => {
                if (!allProductIds.includes(item.product_id)) {
                    allProductIds.push(item.product_id);
                }
            })

            let calculationOftheTotalValue = 0;
            
            allProductIds.forEach(async product_id => {
                const response: Product = await getProductData(product_id);
                this.productData[product_id] = response;
                
                this.shoppingCart.forEach(item => {
                    if (item.product_id === product_id) {
                        if (this.productData[product_id].discount_percentage > 0) {
                            this.orderTotal = Math.round((this.orderTotal + ((item.quantity * this.productData[product_id].price) * ((100 - this.productData[product_id].discount_percentage) / 100))) * 100 ) / 100;
                        } else {
                            this.orderTotal = Math.round((this.orderTotal + (item.quantity * this.productData[product_id].price)) * 100) / 100;
                        }
                    }
                })      
                
            })
        }
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
};