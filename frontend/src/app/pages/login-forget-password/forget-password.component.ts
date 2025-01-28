import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'login-forget-password',
    standalone: true,
    imports: [FormsModule, RouterModule],
    templateUrl: './forget-password.component.html',
    styleUrl: './forget-password.component.scss',
})
export class LoginForgetPassword {
    firstName = '';
    lastName = '';
    fullName = this.firstName + this.lastName;
    email = '';
    phoneNumber = '';


    onInputPhoneNumber(event: Event): void {
        const inputValue = (event.target as HTMLInputElement).value;
        // CONDITIONS TO ADD NEW VALUE
        console.log(inputValue.length, inputValue)
        if (inputValue.length === 1 && this.phoneNumber.length === 0) {
            this.phoneNumber = '(' + inputValue;
        } else if (inputValue.length === 3 && this.phoneNumber.length === 2) {
            this.phoneNumber = inputValue.concat(') ');
        } else if (inputValue.length === 11 && this.phoneNumber.length === 10) {
            this.phoneNumber = inputValue.substring(0, 10) + '-' + inputValue.substring(10, 11);
        }
        // CONDITIONS TO REMOVE VALUE
        else if (inputValue.length === 1 && this.phoneNumber.length === 2) {
            this.phoneNumber = '';
        } else if (inputValue.length === 4 && this.phoneNumber.length === 5) {
            this.phoneNumber = this.phoneNumber.substring(0, 2);
        } else if (inputValue.length === 11 && this.phoneNumber.length === 12) {
            this.phoneNumber = inputValue.substring(0, 10);
        }
        // JUST ADD THE NUMBER ENTERED;
        else {
            this.phoneNumber = inputValue;
        }
    }

    onSubmit() {
        const regexForEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const regexForPhoneNumber = /^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/;

        if (regexForEmail.test(this.email) && regexForPhoneNumber.test(this.phoneNumber) && this.firstName !== '' && this.lastName !== '' && this.email !== '') {
            console.log('enviar requisição');
        } else return;
    }    
}