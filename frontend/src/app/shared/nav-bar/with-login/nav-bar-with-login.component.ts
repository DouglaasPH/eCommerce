import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'nav-bar-with-login',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './nav-bar-with-login.component.html',
    styleUrl: './nav-bar-with-login.component.scss',
})
export class NavBarWithLogin {
    
}