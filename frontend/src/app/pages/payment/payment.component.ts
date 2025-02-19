import { Component } from "@angular/core";
import { navBar } from "../../shared/nav-bar/nav-bar.component";
import { FooterBar } from "../../shared/footer-bar/footer-bar.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { OrderSumaryService } from "../../services/orderSumary.service";
import { orderSumary } from "../../shared/orderSumary/orderSumary.component";

interface creditCard {
    [key: string]: string
}

@Component({
    selector: 'payment',
    standalone: true,
    imports: [navBar, FooterBar, orderSumary, CommonModule, FormsModule],
    templateUrl: './payment.component.html',
    styleUrl: './payment.component.scss',
})
export class Payment {
    constructor(private orderSumaryService: OrderSumaryService) {}

    creditCardDatas: creditCard = {
        card_number: '',
        namePrintedOrCard: '',
        validity: '',
        verificationCade: '',
        cpfOrCnpj: '',
        dateOfBirth: '',
        paymentMethod: '',
    }

    choosePaymentMethod = '';
    
    setChoosePaymentMethod(paymentMethod: string) {
        console.log(this.creditCardDatas)
        if (paymentMethod === 'PIX') {
            this.choosePaymentMethod = paymentMethod;
            this.orderSumaryService.setChosenPayment(paymentMethod);            
        } else if (paymentMethod === 'credit card') {
            const keys = Object.keys(this.creditCardDatas);
            let condition = false;
            keys.forEach(key => this.creditCardDatas[key] !== '' ? condition = true : condition = false);

            if (condition) {
            this.choosePaymentMethod = paymentMethod;
            this.orderSumaryService.setChosenPayment(paymentMethod);                            
            } else {
            this.choosePaymentMethod = paymentMethod;
            this.orderSumaryService.setChosenPayment('');                            
            }
        } else {
            this.choosePaymentMethod = '';
            this.orderSumaryService.setChosenPayment('');                        
        }
    }
}