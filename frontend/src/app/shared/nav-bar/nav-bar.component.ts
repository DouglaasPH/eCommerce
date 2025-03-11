import { CommonModule, Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { checkLoggined } from "../../requests/forLogin";
import { Router } from "@angular/router";
import { ScreenSizeService } from "../../services/screnSize.service";

@Component({
    selector: 'nav-bar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss', './media-queries-for-nav-bar.component.scss'],
})
export class navBar implements OnInit {
    constructor(private router: Router, private location: Location, public screenSizeService: ScreenSizeService) { }
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

    onButtonLogin() {
        this.location.replaceState('/login/sign-in');
        window.location.reload();
    }

    onHome() {
        this.location.replaceState('/');
        window.location.reload();
    }

    onShop() {
        this.location.replaceState('/shop');
        window.location.reload();
    }

    onMyAccountMyData() {
        this.location.replaceState('/my-account/my-data');
        window.location.reload();
    }

    onMyOrders() {
        this.location.replaceState('/my-account/my-orders');
        window.location.reload();
    }

    onShoppingCart() {
        this.location.replaceState('/shopping-cart');        
        window.location.reload();
    }

    onFavorites() {
        this.location.replaceState('/my-account/favorites');
        window.location.reload();        
    }
}