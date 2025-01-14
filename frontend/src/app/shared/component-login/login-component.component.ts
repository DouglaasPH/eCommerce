import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'login-component',
    imports: [RouterOutlet], 
    templateUrl: './login-component.component.html',
    styleUrl: './login-component.component.scss',
})
export class LoginPageComponent {};