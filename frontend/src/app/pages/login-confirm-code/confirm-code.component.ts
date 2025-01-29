import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { EnterNewPasswordGuard } from "../../guards/enterNewPassword.guard";

@Component({
    selector: "login-confirm-code",
    standalone: true,
    imports: [RouterModule],
    templateUrl: "./confirm-code.component.html",
    styleUrl: "./confirm-code.component.scss",
})
export class LoginConfirmCode {
    constructor(private enternewpasswordguard: EnterNewPasswordGuard, private router: Router) { }
    
    async onButtonSubmit() {
        this.enternewpasswordguard.setGoToEnterNewPassword(true);
        const condition = await this.enternewpasswordguard.canActivate();

        if (condition) {
            this.router.navigate(['/login/forget-password/confirm-code/enter-new-password']);
        } else return;
    }
}