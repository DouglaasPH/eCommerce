import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { ForgetPasswordService } from "../../services/forgetPassword.service";
import { updatePassword } from "../../requests/forLogin";

@Component({
    selector: 'login-enter-new-password',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login-enter-new-password.component.html',
    styleUrls: ['./login-enter-new-password.component.scss', './media-queries-enter-new-password.component.scss'],
})      
export class LoginEnterNewPassword {
    constructor(private forgetPasswordService: ForgetPasswordService, private router: Router) {}

    newPassword = '';
    confirmPassword = '';

    async onSubmit() {
        if (this.newPassword === this.confirmPassword) {
            this.forgetPasswordService.setDataPassword(this.confirmPassword);
            const emailAndPassword = this.forgetPasswordService.getDatas();
            const requestUpdatePassword = await updatePassword(emailAndPassword);

            if (requestUpdatePassword.updatedPassword) {
                this.router.navigate(['/login/sign-in']);
            } else {
                this.router.navigate(['/']);
            }
        }
    }
}