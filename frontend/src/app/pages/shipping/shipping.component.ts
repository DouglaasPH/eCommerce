import { Component, OnInit } from "@angular/core";
import { navBar } from "../../shared/nav-bar/nav-bar.component";
import { FooterBar } from "../../shared/footer-bar/footer-bar.component";
import { CommonModule } from "@angular/common";
import { OrderSumaryService } from "../../services/orderSumary.service";
import { Router } from "@angular/router";

@Component({
    selector: 'shipping',
    standalone: true,
    imports: [navBar, FooterBar, CommonModule],
    templateUrl: './shipping.component.html',
    styleUrl: './shipping.component.scss'
})
export class Shipping implements OnInit {
    constructor(private orderSumaryService: OrderSumaryService, private router: Router) {}
    shoppingCart: any[] = [];
    orderSumary = {
        fullPriceWithoutDiscount: 0,
        discount: 0,
        shipping: "undefined",
        couponApplied: 0,
        total: 0,
        estimatedDelivery: "undefined",        
    }

    shipments = [
        {
            valueShipment: 'Free',
            shipmentType: 'Regular',
            deliveryData: '01, Feb, 2025',
        },
        {
            valueShipment: '8.50',
            shipmentType: 'Priority',
            deliveryData: '28, Jan, 2025',
        }
    ];

    chosenDelivery = -1;

    async ngOnInit() {
        await this.updateProperties();
    }

    async updateProperties() {
        const response = await this.orderSumaryService.getAllProperties();
        this.shoppingCart = response.shoppingCart;
        this.orderSumary = response.orderSumary;
    }
    
    setChooseDelivery(index: number) {
        this.chosenDelivery = index;
    }

    continueToPayment() {
        if (this.chosenDelivery > -1) {
            this.router.navigate(['shopping-cart/address/shipping/payment']);
        } else return;
    }
    
}