import { Component, OnDestroy } from "@angular/core";
import { navBar } from "../../shared/nav-bar/nav-bar.component";
import { FooterBar } from "../../shared/footer-bar/footer-bar.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { OrderSumaryService } from "../../services/orderSumary.service";
import { orderSumary } from "../../shared/orderSumary/orderSumary.component";
import { OrderDataService } from "../../services/orderDatas.service";
import { getInstallment } from "../../requests/forInstallment";

interface creditCard {
    [key: string]: string
}

@Component({
    selector: 'payment',
    standalone: true,
    imports: [navBar, FooterBar, orderSumary, CommonModule, FormsModule],
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss', './media-queries-for-payment.component.scss'],
})
export class Payment implements OnDestroy {
    constructor(private orderSumaryService: OrderSumaryService, private orderDataService: OrderDataService) { }
    
    ngOnDestroy(): void {
        this.orderSumaryService.clearOrderSumary();
    }

    creditCardData: creditCard = {
        card_number: '',
        namePrintedOrCard: '',
        validity: '',
        verificationCade: '',
        cpfOrCnpj: '',
        dateOfBirth: '',
        paymentMethod: '',
    }

    choosePaymentMethod = '';
    installments: any[] = [];

    async setChoosePaymentMethod(paymentMethod: string) {
        console.log(paymentMethod);
        if (paymentMethod === 'pix') {
            this.choosePaymentMethod = paymentMethod;
            this.orderDataService.updatePaymentMethod('pix');
            this.orderSumaryService.setChosenPayment(paymentMethod);            
        } else if (paymentMethod === 'credit card') {
            this.choosePaymentMethod = paymentMethod;
            this.orderDataService.updatePaymentMethod('credit card');
            this.orderSumaryService.setChosenPayment(paymentMethod);
            await this.updateInstallments();
        } else {
            this.choosePaymentMethod = '';
                this.orderDataService.updatePaymentMethod('');            
            this.orderSumaryService.setChosenPayment('');                        
        }
    }

    async updateInstallments() {
        try {
            const valueTotal = this.orderSumaryService.orderSumary.total;
            const response = await getInstallment(valueTotal);

            for (let i = 1; i < response[0].max_quantity_installments + 1; i++) {
                if (i <= response[0].max_installments_without_fees) {
                    const value = Math.floor((valueTotal / i) * 100) / 100;
                    this.installments.push([i, value, 'without fees']);
                } else {
                    const fees = Math.floor((valueTotal * (response[0].fees / 100) * i) * 100) / 100;
                    const value = Math.floor(((fees + valueTotal) / i) * 100) / 100;
                    this.installments.push([i, value, 'with fees']);                    
                }
            }
        } catch (error) {
            console.log(error);
        }
    }    

    finalizePurchase() {
        const keys = Object.keys(this.creditCardData);
        let condition = false;
        keys.forEach(key => this.creditCardData[key] !== '' ? condition = true : condition = false);

        if (condition) {
            this.orderDataService.updateCreditCardData(this.creditCardData);
        } else return;
    }

    onChangeCreditCardData() {
        this.orderDataService.updateCreditCardData(this.creditCardData);
    }
}