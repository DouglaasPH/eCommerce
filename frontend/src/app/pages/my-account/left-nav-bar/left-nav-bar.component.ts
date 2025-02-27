import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
    selector: 'left-nav-bar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './left-nav-bar.component.html',
    styleUrl: './left-nav-bar.component.scss'
})
export class LeftNavBar {

}