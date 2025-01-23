import { Component } from "@angular/core";
import { NavBarWithLogin } from "../../shared/nav-bar/with-login/nav-bar-with-login.component";
import { FiltersComponent } from "./components/filters/filters-component.component";
import { WomenCollection } from "../../shared/women-collection/women-collection.component";
import { FollowUsOnInstagram } from "../../shared/follow-us-on-instagram/follow-us-on-instagram.component";
import { SubscribeToOurNewslatter } from "../../shared/subscribe-to-our-newslatter/subscribe-to-our-newslatter.component";
import { FooterBar } from "../../shared/footer-bar/footer-bar.component";
import { Shop } from "./components/shop/shop.component";

@Component({
    selector: 'shop-page',
    standalone: true,
    imports: [NavBarWithLogin, FiltersComponent, Shop, WomenCollection, FollowUsOnInstagram, SubscribeToOurNewslatter, FooterBar],
    templateUrl: './shop-page.component.html',
    styleUrl: './shop-page.component.scss',
})
export class ShopPage {

}