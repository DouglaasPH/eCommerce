import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { AuthGuard } from "../../guards/auth.guard";
import { NavBarWithLogin } from "./logged-in-user/nav-bar-with-login.component";
import { NavBarWithoutLogin } from "./user-not-logged-in/nav-bar-without-login.component";

@Component({
    selector: 'nav-bar',
    standalone: true,
    imports: [CommonModule, NavBarWithLogin, NavBarWithoutLogin],
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss',
})
export class navBar implements OnInit {
    isLogginned = false;

    constructor(private authguard: AuthGuard) { }

    async ngOnInit() {
        await this.displayNavBar();
    }

    async displayNavBar() {
        const condition = await this.authguard.canActivate();
        this.isLogginned = condition;
        console.log(condition);
    }
}