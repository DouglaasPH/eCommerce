import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPageComponent } from './shared/component-login/login-component.component';
import { LoginSignUp } from './pages/login-sign-up/sign-up.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginSignUp, LoginPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'eCommerce';
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}