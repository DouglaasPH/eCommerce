import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'login-enter-new-password',
    standalone: true,
    imports: [FormsModule, RouterModule],
    templateUrl: './login-enter-new-password.component.html',
    styleUrl: './login-enter-new-password.component.scss'
})
export class LoginEnterNewPassword {
    newPassword = '';
    confirmPassword = '';

    onSubmi() {
        if (this.newPassword === this.confirmPassword) {
            console.log("enviar requisição");
            
        }
    }
}