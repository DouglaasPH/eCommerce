import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { createAccount, validateEmail } from "../../requests/loginRequests";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'login-sign-up',
    standalone: true,
    imports: [FormsModule, RouterModule, CommonModule],
    templateUrl: './login-sign-up.component.html',
    styleUrl: './login-sign-up.component.scss'
})
export class LoginSignUp {
    constructor(private router: Router) { }
    
    firstName = '';
    lastName = '';
    email = '';
    phoneNumber = '';
    password = '';
    confirmPassword = '';
    invalidEmail = false;


    onInputPhoneNumber(event: Event): void {
        const inputValue = (event.target as HTMLInputElement).value;
        // CONDITIONS TO ADD NEW VALUE
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

    async onSubmit() {
        const regexForEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const regexForPhoneNumber = /^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/;

        if (regexForEmail.test(this.email) && regexForPhoneNumber.test(this.phoneNumber) && this.firstName !== '' && this.lastName !== '' && this.email !== '' && this.password === this.confirmPassword) {
            const requestValidateEmail = await validateEmail(this.email);            
            
            if (!requestValidateEmail.registeredEmail) {
                const request = await createAccount({ name: this.firstName + ' ' + this.lastName, email: this.email, phone_number: this.phoneNumber, password: this.password });
            
                if (request.accountCreate) {
                    this.router.navigate(['/login/sign-in']);
                } else return;   
            } else {
                this.invalidEmail = true;
            }

        } else return;
    }

    changeInvalidEmailState() {
        if (this.invalidEmail) {
            this.invalidEmail = false;
        } else return;
    }    
};