import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { checkLoggined } from "../requests/loginRequests";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {
    private isLogginned: boolean = false;

    constructor(private router: Router) { }
    
    async canActivate() {
        const loginStatus = await checkLoggined();
        this.isLogginned = loginStatus.isLogginned;

        // not logged in
        if (!this.isLogginned) {
            return true;
        }
        // is logginned
        else {
            this.router.navigate(['/']);
            return false;
        }
    }

    setAuthentication(status: boolean) {
        this.isLogginned = status;
    }

};