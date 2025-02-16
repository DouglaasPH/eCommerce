import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { requestSignIn } from "../../requests/loginRequests";

@Component({
    selector: 'login-sign-in',
    standalone: true,
    imports: [FormsModule, RouterModule],
    templateUrl: './login-sign-in.component.html',    
    styleUrl: './login-sign-in.component.scss',
})
export class LoginSignIn {
    constructor(private router: Router) {}

    datas = {
        email: '',
        password: '',
    };
    
    async onSubmit() {
        const regexForEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;        
        if (this.datas.email !== '' && regexForEmail.test(this.datas.email) && this.datas.password !== '') {
            try {
                await requestSignIn(this.datas);   
                this.router.navigate(['/']);
            } catch (error) {
                window.location.reload();
            }
        } else return;
    }
}