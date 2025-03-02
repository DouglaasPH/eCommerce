import { Injectable } from "@angular/core";

interface forgetPasswordServiceInterface {
    email: string,
    password: string,
}

@Injectable({
    providedIn: 'root',
})
export class ForgetPasswordService {
    private data: forgetPasswordServiceInterface = {
        email: '',
        password: '',
    };

    setDataEmail(email: string) {
        this.data = {
            password: '',
            email: email,
        };
    }

    setDataPassword(password: string) {
        this.data = {
            ...this.data,
            password: password,
        };
    }    

    getDatas() {
        return this.data;
    }
};