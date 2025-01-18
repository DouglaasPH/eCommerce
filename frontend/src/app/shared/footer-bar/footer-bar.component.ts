import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'footer-bar',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './footer-bar.component.html',
    styleUrl: './footer-bar.component.scss',
})
export class FooterBar {

}