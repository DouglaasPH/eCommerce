import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { checkLoggined } from "../../requests/loginRequests";
import { Router } from "@angular/router";

@Component({
    selector: 'nav-bar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss',
})
export class navBar implements OnInit {
    constructor(private router: Router) { }
    isLogginned = false;
    currentRoute = '';

    async ngOnInit() {
        this.currentRoute = this.router.url;
        await this.displayNavBar();
    }

    async displayNavBar() {
        const condition = await checkLoggined();
        this.isLogginned = condition.isLogginned;
    }

    onButtonSignIn() {
        this.router.navigate(['/login/sign-in']);
    }

    onButtonSignUp() {
        this.router.navigate(['/login/sign-up']);
    }

    onHome() {
        this.router.navigate(['/']);
    }

    onShop() {
        this.router.navigate(['/shop']);
    }


}