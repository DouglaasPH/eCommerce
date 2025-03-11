import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'login-component',
    imports: [RouterOutlet],
    templateUrl: './login-component.component.html',
    styleUrls: ['./login-component.component.scss', './media-queries-for-login.component.scss'],
})
export class LoginPageComponent {};