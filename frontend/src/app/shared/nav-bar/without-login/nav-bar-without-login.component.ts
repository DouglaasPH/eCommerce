import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'nav-bar-without-login',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './nav-bar-without-login.component.html',
    styleUrl: './nav-bar-without-login.component.scss',    
})
export class NavBarWithoutLogin {

};