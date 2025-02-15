import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'ultimate-sale',
    standalone: true,
    templateUrl: './ultimate-sale.component.html',
    styleUrl: './ultimate-sale.component.scss',
})
export class ultimateSale {
    constructor(private router: Router) {}

    onShop() {
        this.router.navigate(['/shop']);
    }
};