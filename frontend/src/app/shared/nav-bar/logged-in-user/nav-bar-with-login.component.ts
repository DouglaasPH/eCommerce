import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'nav-bar-with-login',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './nav-bar-with-login.component.html',
    styleUrl: './nav-bar-with-login.component.scss',
})
export class NavBarWithLogin implements OnInit {
    currentRoute = '';

    constructor(private router: Router) { }
    
    ngOnInit() {
        this.currentRoute = this.router.url;
    }

    onHome() {
        this.router.navigate(['/']);
    }

    onShop() {
        this.router.navigate(['/shop']);
    }

}