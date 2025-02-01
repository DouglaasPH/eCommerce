import { Component } from "@angular/core";
import { SubscribeToOurNewslatter } from "../../shared/subscribe-to-our-newslatter/subscribe-to-our-newslatter.component";
import { FooterBar } from "../../shared/footer-bar/footer-bar.component";
import { navBar } from "../../shared/nav-bar/nav-bar.component";

@Component({
    selector: 'checkout',
    standalone: true,
    imports: [navBar, SubscribeToOurNewslatter, FooterBar],
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.scss',
})
export class Checkout {

};