import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class OrderDataService {
    address = {};
    shipping = {};
    paymentMethod = '';
    creditCardData = {};

    updateAddress(newAddress: object) {
        this.address = newAddress;
        sessionStorage.setItem('address', `${JSON.stringify(this.address)}`);
    }

    updateShipping(newShipping: object) {
        this.shipping = newShipping;
        sessionStorage.setItem('shipping', `${JSON.stringify(this.shipping)}`);        
    }

    updatePaymentMethod(newPaymentMethod: string) {
        this.paymentMethod = newPaymentMethod;
        sessionStorage.setItem('paymentMethod', `${this.paymentMethod}`);

        if (newPaymentMethod === 'pix') {
            sessionStorage.setItem('creditCardData', "{}");
        } else return;
    }

    updateCreditCardData(newCreditCardData: object) {
        this.creditCardData = newCreditCardData;
        sessionStorage.setItem('creditCardData', `${JSON.stringify(this.creditCardData)}`);
    }

    resetData() {
        this.address = {};
        this.shipping = {};
        this.paymentMethod = '';
        this.creditCardData = {};
        sessionStorage.setItem('address', "{}");
        sessionStorage.setItem('shipping', "{}");
        sessionStorage.setItem('paymentMethod', "");
        sessionStorage.setItem('creditCardData', "{}");        
    }
}