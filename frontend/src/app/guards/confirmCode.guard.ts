import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthGuard } from "./auth.guard";

@Injectable({
    providedIn: 'root',
})
export class ConfirmCodeGuard implements CanActivate {
    private goToConfirmCode = false;
    
    constructor(private router: Router, private authGuard: AuthGuard) { }
    
    async canActivate() {
        const authGuardState = await this.authGuard.canActivate();
        if (authGuardState && this.goToConfirmCode) {
            return true
        }
        else {
            this.router.navigate(['/']);            
            return false;
        }
    }

    setgoToConfirmCode(status: boolean) {
        this.goToConfirmCode = status;
    }    
}