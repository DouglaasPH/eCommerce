import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { ForgetPasswordService } from "../../services/forgetPassword.service";
import { ConfirmCodeGuard } from "../../guards/confirmCode.guard";
import { validateEmail } from "../../requests/forLogin";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'login-forget-password',
    standalone: true,
    imports: [FormsModule, RouterModule, CommonModule],
    templateUrl: './forget-password.component.html',
    styleUrl: './forget-password.component.scss',
})
export class LoginForgetPassword {
    constructor(private forgetPasswordsService: ForgetPasswordService, private router: Router, private confirmCodeGuard: ConfirmCodeGuard) {}

    email = '';
    invalidEmail = false;

    async onSubmit() {
        if (!this.invalidEmail) {
            const requestValidateEmail = await validateEmail(this.email);

            if (requestValidateEmail.registeredEmail) {
                this.forgetPasswordsService.setDataEmail(this.email);
                this.confirmCodeGuard.setgoToConfirmCode(true);
                const condition = await this.confirmCodeGuard.canActivate();

                if (condition) {
                    this.router.navigate(['/login/forget-password/confirm-code']);
                } else return;
            } else {
                this.invalidEmail = true;
            }
        } else return;
    }
    
    changeInvalidEmailState() {
        const regexForEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (regexForEmail.test(this.email)) {
            this.invalidEmail = false;
        } else {
            this.invalidEmail = true;
        };
    }
}