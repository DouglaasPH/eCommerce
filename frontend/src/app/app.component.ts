import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'eCommerce';

    browsingHistory: string[] = [];

    constructor(private router: Router) { 
        this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            this.browsingHistory = JSON.parse(sessionStorage.getItem('browsingHistory') || '[]');
            this.browsingHistory.push(event.urlAfterRedirects);
            sessionStorage.setItem('browsingHistory', JSON.stringify(this.browsingHistory));

            // always redirects to the top of the page
            window.scroll(0, 0);
            }
        });
      
    }  
}

