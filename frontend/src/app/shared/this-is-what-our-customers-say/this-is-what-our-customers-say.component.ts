import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
    selector: 'this-is-what-our-customers-say',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './this-is-what-our-customers-say.component.html',
    styleUrls: ['./this-is-what-our-customers-say.component.scss', './media-queries-for-this-is-what-our-customers.component.scss'],
})
export class ThisIsWhatOurCustomersSay {
    currentIndex = 1;
    direction = "";
    goLeft = [40, 7, 50];
    goRight = [30, 40, 20];
    main = "";
    secondary = "";
    tertiary = "";
    mainContainer = "";
    containerOrder = ["first", "second", "third"];
    porcentage = []

    onLeftDirection() {
        this.containerOrder = [this.containerOrder[1], this.containerOrder[2], this.containerOrder[0]];
        console.log(this.containerOrder);
    }
    onRightDirection() {
        this.containerOrder = [this.containerOrder[2], this.containerOrder[0], this.containerOrder[1]];
        console.log(this.containerOrder);
    }    
}