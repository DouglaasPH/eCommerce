import { Injectable } from "@angular/core";
import { AuthGuard } from "../app/guards/auth.guard";
import { checkLoggined } from "../app/requests/loginRequests";

@Injectable({
    providedIn: "root",
})
export class checkLoginCondition {
    constructor(private authguard: AuthGuard) { }   
    
    async giveRoutePermission() {
        const loginStatus = await checkLoggined();
        console.log(loginStatus.isLogginned)
        if (loginStatus) {
            this.authguard.setAuthentication(true);
            this.authguard.canActivate();
        } else {
            this.authguard.setAuthentication(false);            
            this.authguard.canActivate();
        }
    }
}