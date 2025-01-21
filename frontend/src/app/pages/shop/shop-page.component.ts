import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavBarWithLogin } from "../../shared/nav-bar/with-login/nav-bar-with-login.component";
import { FiltersComponent } from "./components/filters/filters-component.component";

@Component({
    selector: 'shop-page',
    standalone: true,
    imports: [RouterOutlet, NavBarWithLogin, FiltersComponent],
    templateUrl: './shop-page.component.html',
    styleUrl: './shop-page.component.scss',
})
export class ShopPage {

}