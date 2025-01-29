import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthGuard } from "./auth.guard";

@Injectable({
    providedIn: 'root',
})
export class ConfirmCodeGuard implements CanActivate {
    private goToConfirmCode = false;
    
    constructor(private router: Router, private authguard: AuthGuard) { }
    
    async canActivate() {
        const authGuardState = await this.authguard.canActivate();
        console.log(authGuardState);
        if (authGuardState && this.goToConfirmCode) {
            console.log(authGuardState, this.goToConfirmCode);
            return true
        }
        else {
            console.log(authGuardState, this.goToConfirmCode);            
            this.router.navigate(['/']);            
            return false;
        }
    }

    setgoToConfirmCode(status: boolean) {
        this.goToConfirmCode = status;
    }    
}