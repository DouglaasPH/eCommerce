import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LoginPageComponent } from "../../shared/component-login/login-component.component";

@Component({
    selector: 'login-sign-up',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss',
})
export class LoginSignUp {

}