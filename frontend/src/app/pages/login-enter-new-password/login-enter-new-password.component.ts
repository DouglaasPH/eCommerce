import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { ForgetPasswordSingletonService } from "../../services/auth.service";
import { updatePassword } from "../../requests/loginRequests";

@Component({
    selector: 'login-enter-new-password',
    standalone: true,
    imports: [FormsModule, RouterModule],
    templateUrl: './login-enter-new-password.component.html',
    styleUrl: './login-enter-new-password.component.scss'
})      
export class LoginEnterNewPassword {
    constructor(private forgetpasswordsingletonservice: ForgetPasswordSingletonService, private router: Router) {}

    newPassword = '';
    confirmPassword = '';

    async onSubmit() {
        if (this.newPassword === this.confirmPassword) {
            this.forgetpasswordsingletonservice.setDataPassword(this.confirmPassword);
            const emailAndPassword = this.forgetpasswordsingletonservice.getDatas();
            const requestUpdatePassword = await updatePassword(emailAndPassword);

            if (requestUpdatePassword.updatedPassword) {
                this.router.navigate(['/login/sign-in']);
            } else {
                this.router.navigate(['/']);
            }
        }
    }
}