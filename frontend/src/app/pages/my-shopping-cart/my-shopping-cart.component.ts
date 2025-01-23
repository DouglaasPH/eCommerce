import { Component } from "@angular/core";
import { NavBarWithLogin } from "../../shared/nav-bar/with-login/nav-bar-with-login.component";
import { SubscribeToOurNewslatter } from "../../shared/subscribe-to-our-newslatter/subscribe-to-our-newslatter.component";
import { FooterBar } from "../../shared/footer-bar/footer-bar.component";

@Component({
    selector: 'my-shopping-cart',
    standalone: true,
    imports: [NavBarWithLogin, SubscribeToOurNewslatter, FooterBar]
})