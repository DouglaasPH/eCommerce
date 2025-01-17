import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavBarWithoutLogin } from "../../shared/nav-bar/without-login/nav-bar-without-login.component";
import { ultimateSale } from "../../shared/ultimate-sale/ultimate-sale.component";
import { DealsOfTheMonth } from "../../shared/deals-of-the-month/deals-of-the-month.component";
import { Brands } from "./components/brands/brands.component";
import { WomenCollection } from "../../shared/women-collection/women-collection.component";
import { FollowUsOnInstagram } from "../../shared/follow-us-on-instagram/follow-us-on-instagram.component";
import { ThisIsWhatOurCustomersSay } from "../../shared/this-is-what-our-customers-say/this-is-what-our-customers-say.component";

@Component({
    selector: 'home-page',
    standalone: true,
    imports: [RouterOutlet, NavBarWithoutLogin, ultimateSale, Brands, DealsOfTheMonth, WomenCollection, FollowUsOnInstagram, ThisIsWhatOurCustomersSay],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
})
export class HomePage {

}