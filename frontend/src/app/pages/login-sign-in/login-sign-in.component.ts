import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { requestSignIn } from "../../../requests/loginRequests";
import { AuthGuard } from "../../auth.guard";

@Component({
    selector: 'login-sign-in',
    standalone: true,
    imports: [FormsModule, RouterModule],
    templateUrl: './login-sign-in.component.html',    
    styleUrl: './login-sign-in.component.scss',
})
export class LoginSignIn {
    constructor(private authguard: AuthGuard) {}

    datas = {
        email: '',
        password: '',
    };
    
    async onSubmit() {
        const regexForEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;        
        if (this.datas.email !== '' && regexForEmail.test(this.datas.email)  && this.datas.password !== '') {
            const request = await requestSignIn(this.datas);
            // consumir requisição
            this.authguard.setAuthentication(true);
            this.authguard.canActivate();
        } else {
            this.authguard.setAuthentication(true);
            this.authguard.canActivate();
        }
    }
}