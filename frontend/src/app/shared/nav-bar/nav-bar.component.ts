import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NavBarWithLogin } from "./logged-in-user/nav-bar-with-login.component";
import { NavBarWithoutLogin } from "./user-not-logged-in/nav-bar-without-login.component";
import { checkLoggined } from "../../requests/loginRequests";

@Component({
    selector: 'nav-bar',
    standalone: true,
    imports: [CommonModule, NavBarWithLogin, NavBarWithoutLogin],
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss',
})
export class navBar implements OnInit {
    isLogginned = false;

    async ngOnInit() {
        await this.displayNavBar();
    }

    async displayNavBar() {
        const condition = await checkLoggined();
        this.isLogginned = condition.isLoggined;
    }
}