import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { ConfirmCodeGuard } from "./confirmCode.guard";

@Injectable({
    providedIn: 'root'
})
export class EnterNewPasswordGuard implements CanActivate {
    private goToEnterNewPassword: boolean = false;

    constructor(private router: Router, private authguard: AuthGuard, private confirmcodeguard: ConfirmCodeGuard) { }
    
    async canActivate() {
        const authGuardState = await this.authguard.canActivate();
        const confirmCodeGuardState = await this.confirmcodeguard.canActivate();
        console.log('authGuardState:', authGuardState);
        console.log('confirmCodeGuardState:', confirmCodeGuardState);
        console.log('goToEnterNewPassword:', this.goToEnterNewPassword);
        if (authGuardState && confirmCodeGuardState && this.goToEnterNewPassword) {
            console.log(true);
            return true;
        } else {
            console.log(false);
            this.router.navigate(['/']);
            return false;
        }
    }

    setGoToEnterNewPassword(status: boolean) {
        this.goToEnterNewPassword = status;
    }
};