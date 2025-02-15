import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class shoppingCartService {
    private cart: object[] = [];

    setCart(addToCart: object) {
        this.cart = [
            ...this.cart,
            addToCart,
        ];
        console.log(this.cart);
    }

    getCart() {
        return this.cart;
    }

    removePurchase(id: number) {
        console.log(id);
    }
}