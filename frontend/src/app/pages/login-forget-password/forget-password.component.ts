import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { ForgetPasswordSingletonService } from "../../services/auth.service";
import { ConfirmCodeGuard } from "../../guards/confirmCode.guard";
import { validateEmail } from "../../requests/loginRequests";

@Component({
    selector: 'login-forget-password',
    standalone: true,
    imports: [FormsModule, RouterModule],
    templateUrl: './forget-password.component.html',
    styleUrl: './forget-password.component.scss',
})
export class LoginForgetPassword {
    constructor(private forgetpasswordsingletonservice: ForgetPasswordSingletonService, private router: Router, private confirmcodeguard: ConfirmCodeGuard) {}

    email = '';

    async onSubmit() {
        const regexForEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (regexForEmail.test(this.email)) {
            const requestValidateEmail = await validateEmail(this.email);

            if (requestValidateEmail.registeredEmail) {
                this.forgetpasswordsingletonservice.setDataEmail(this.email);
                this.confirmcodeguard.setgoToConfirmCode(true);
                const condition = await this.confirmcodeguard.canActivate();

                if (condition) {
                    console.log('goToConfirmCode:', condition)
                    this.router.navigate(['/login/forget-password/confirm-code']);
                } else return;
            } else {
                console.log('Attention: invalid e-mail');   
            }
        } else return;
    }    
}