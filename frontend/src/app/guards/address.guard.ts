import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { checkLoggined } from "../requests/forLogin";

@Injectable({
    providedIn: "root"
})
export class AddressGuard implements CanActivate {    
    constructor(private router: Router) {}

    async canActivate() {
        return this.check()
    }

    async check() {
        const loginStatus = await checkLoggined();
        const isLogginned = loginStatus.isLogginned;
        const condition = Boolean(sessionStorage.getItem('proceedToChooseAddress'));
        
        if (isLogginned && condition) {
            return true;
        } else {
            if (isLogginned) {
                this.router.navigate(['/shopping-cart'])
                return false;
            } else {
                this.router.navigate(['/login/sign-up'])
                return false;                
            }
        }
    }
};