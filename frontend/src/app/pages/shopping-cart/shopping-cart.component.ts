import { Component, OnInit } from "@angular/core";
import { FooterBar } from "../../shared/footer-bar/footer-bar.component";
import { navBar } from "../../shared/nav-bar/nav-bar.component";
import { CommonModule, Location } from "@angular/common";
import { removeItem, updateItem } from "../../requests/shoppingCartRequests";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { ProcessPurchaseService } from "../../services/processPurchase.service";
import { orderSumary } from "../../shared/orderSumary/orderSumary.component";
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
    imports: [CommonModule, FormsModule, FooterBar, navBar, orderSumary],
    templateUrl: './shopping-cart.component.html',
    styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCart implements OnInit {
    constructor(private router: Router, private processPurchaseService: ProcessPurchaseService, private location: Location, private orderSumaryService: OrderSumaryService) { }
    

    browsingHistory: string[] = JSON.parse(sessionStorage.getItem('browsingHistory') || '[]');
    
    shoppingCart: any[] = [];
    productData: Product[] = [];
    objectKeys = Object.keys;

    async ngOnInit(): Promise<void> {
        await this.updateProperties();
    }

    async updateProperties() {
        const response = await this.processPurchaseService.getAllProperties();
        this.shoppingCart = response.shoppingCart;
        this.productData = response.productData;
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
        await this.orderSumaryService.updateOrderSumary();        
        console.log(this.orderSumaryService.getOrderSumary());
    }

    onShopping() {
        this.location.replaceState('/shop');
        window.location.reload();
    }
};