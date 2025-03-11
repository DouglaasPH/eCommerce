import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'ultimate-sale',
    standalone: true,
    templateUrl: './ultimate-sale.component.html',
    styleUrls: ['./ultimate-sale.component.scss', './media-queries-for-ultimate-sale.component.scss'],
})
export class ultimateSale {
    constructor(private router: Router) {}

    onShop() {
        this.router.navigate(['/shop']);
    }
};