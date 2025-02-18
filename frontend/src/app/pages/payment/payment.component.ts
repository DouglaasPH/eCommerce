import { Component } from "@angular/core";
import { navBar } from "../../shared/nav-bar/nav-bar.component";
import { FooterBar } from "../../shared/footer-bar/footer-bar.component";
import { CommonModule } from "@angular/common";
import { OrderSumaryService } from "../../services/orderSumary.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'payment',
    standalone: true,
    imports: [navBar, FooterBar, CommonModule, FormsModule],
    templateUrl: './payment.component.html',
    styleUrl: './payment.component.scss',
})
export class Payment {
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

    creditCardDatas = {
        card_number: '',
        namePrintedOrCard: '',
        validity: '',
        verificationCade: '',
        cpfOrCnpj: '',
        dateOfBirth: '',
        paymentMethod: '',
    }

    choosePaymentMethod = '';

    async ngOnInit() {
        await this.updateProperties();
    }

    async updateProperties() {
        const response = await this.orderSumaryService.getAllProperties();
        this.shoppingCart = response.shoppingCart;
        this.orderSumary = response.orderSumary;
    }
    
    setChoosePaymentMethod(paymentMethod: string) {
        this.choosePaymentMethod = paymentMethod;
    }

    continueToConfirmation() {
        if (this.choosePaymentMethod !== '') {
            this.router.navigate(['shopping-cart/address/shipping/payment']);
        } else return;
    }
    
}