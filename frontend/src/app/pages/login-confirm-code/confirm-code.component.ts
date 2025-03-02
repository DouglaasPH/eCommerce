import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { EnterNewPasswordGuard } from "../../guards/enterNewPassword.guard";

@Component({
    selector: "login-confirm-code",
    standalone: true,
    templateUrl: "./confirm-code.component.html",
    styleUrl: "./confirm-code.component.scss",
})
export class LoginConfirmCode {
    constructor(private enterNewPasswordGuard: EnterNewPasswordGuard, private router: Router) { }
    
    async onButtonSubmit() {
        this.enterNewPasswordGuard.setGoToEnterNewPassword(true);
        const condition = await this.enterNewPasswordGuard.canActivate();

        if (condition) {
            // TODO unknown knowledge is required at the moment. You can later add the sending of an email to confirm the code and user by email..
            this.router.navigate(['/login/forget-password/confirm-code/enter-new-password']);
        } else return;
    }
}