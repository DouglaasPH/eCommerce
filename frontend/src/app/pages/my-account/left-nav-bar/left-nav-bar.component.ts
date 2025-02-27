import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'left-nav-bar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './left-nav-bar.component.html',
    styleUrl: './left-nav-bar.component.scss'
})
export class LeftNavBar {
    constructor(private router: Router) {}

    onMyData() {
        this.router.navigate(['/my-account', 'my-data']);
        history.replaceState(null, '', '/my-account/my-data');
        window.location.reload()
    }

    onMyOrders() {
        this.router.navigate(['/my-account', 'my-orders']);
        history.replaceState(null, '', '/my-account/my-orders');
        window.location.reload()
    }    
}