import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
//  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'eCommerce';

    browsingHistory: string[] = [];

    constructor(private router: Router) { 
        this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            this.browsingHistory = JSON.parse(sessionStorage.getItem('browsingHistory') || '[]');
            this.browsingHistory.push(event.urlAfterRedirects);
            sessionStorage.setItem('browsingHistory', JSON.stringify(this.browsingHistory))
                console.log('Histórico de navegação:', this.browsingHistory);
            }
        });
      
      console.log(this.browsingHistory)
    }  
}

