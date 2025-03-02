import { Injectable } from "@angular/core";
import { AuthGuard } from "../app/guards/auth.guard";
import { checkLoggined } from "../app/requests/forLogin";

@Injectable({
    providedIn: "root",
})
export class checkLoginCondition {
    constructor(private authguard: AuthGuard) { }   
    
    async giveRoutePermission() {
        const loginStatus = await checkLoggined();
        if (loginStatus) {
            this.authguard.setAuthentication(true);
            this.authguard.canActivate();
        } else {
            this.authguard.setAuthentication(false);            
            this.authguard.canActivate();
        }
    }
}