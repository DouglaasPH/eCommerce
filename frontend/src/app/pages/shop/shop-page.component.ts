import { Component } from "@angular/core";
import { FiltersComponent } from "./components/filters/filters-component.component";
import { WomenCollection } from "../../shared/women-collection/women-collection.component";
import { FollowUsOnInstagram } from "../../shared/follow-us-on-instagram/follow-us-on-instagram.component";
import { SubscribeToOurNewslatter } from "../../shared/subscribe-to-our-newslatter/subscribe-to-our-newslatter.component";
import { FooterBar } from "../../shared/footer-bar/footer-bar.component";
import { Shop } from "./components/shop/shop.component";
import { CommonModule } from "@angular/common";
import { navBar } from "../../shared/nav-bar/nav-bar.component";

@Component({
    selector: 'shop-page',
    standalone: true,
    imports: [navBar, FiltersComponent, Shop, WomenCollection, FollowUsOnInstagram, SubscribeToOurNewslatter, FooterBar, CommonModule],
    templateUrl: './shop-page.component.html',
    styleUrl: './shop-page.component.scss',
})
export class ShopPage {
}