import { Component } from "@angular/core";
import { WomenCollection } from "../../shared/women-collection/women-collection.component";
import { DealsOfTheMonth } from "../../shared/deals-of-the-month/deals-of-the-month.component";
import { SubscribeToOurNewslatter } from "../../shared/subscribe-to-our-newslatter/subscribe-to-our-newslatter.component";
import { FooterBar } from "../../shared/footer-bar/footer-bar.component";
import { CommonModule, NgFor } from "@angular/common";
import { ShoppingCart } from "../../shared/shopping-cart/shopping-cart.component";
import { navBar } from "../../shared/nav-bar/nav-bar.component";

@Component({
    selector: 'product',
    standalone: true,
    imports: [CommonModule, NgFor, navBar, WomenCollection, DealsOfTheMonth, SubscribeToOurNewslatter, FooterBar, ShoppingCart],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
})
export class ProductPage {
    product = { item: "Rounded Red Hat", images: ['../../../assets/shop/sales/Rounded Red Hat/rounded-red-hat-01.png', '../../../assets/shop/sales/Rounded Red Hat/rounded-red-hat-01.png', '../../../assets/shop/sales/Rounded Red Hat/rounded-red-hat-01.png', '../../../assets/shop/sales/Rounded Red Hat/rounded-red-hat-01.png', '../../../assets/shop/sales/Rounded Red Hat/rounded-red-hat-01.png', '../../../assets/shop/sales/Rounded Red Hat/rounded-red-hat-01.png'], price: '$8.00', sizes: ["M", "L", "XL", "XXL"], totalQuantity: 10, };        
    images = this.product.images;
    currentSize = this.product.sizes[0];
    currentQuantity = 1;
    addToCart = false;

    increaseQuantity() {
        if (this.currentQuantity + 1 <= this.product.totalQuantity) {
            this.currentQuantity = this.currentQuantity + 1;
        }
    }

    decreaseQuantity() {
        if (this.currentQuantity > 1) {
            this.currentQuantity = this.currentQuantity - 1;
        } else return;
    }

    changeSize(switchTo: string) {
        this.currentSize = switchTo;
    }

    viewCart() {
        this.addToCart = true;
    }


}