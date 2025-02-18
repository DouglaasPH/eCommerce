import { Component } from "@angular/core";
import { navBar } from "../../shared/nav-bar/nav-bar.component";
import { FooterBar } from "../../shared/footer-bar/footer-bar.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'payment',
    standalone: true,
    imports: [navBar, FooterBar, CommonModule],
    templateUrl: './payment.component.html',
    styleUrl: './payment.component.scss',
})
export class Payment {
    
}