import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'filters',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './filters-component.component.html',
    styleUrl: './filters-component.component.scss',
})
export class FiltersComponent {

}