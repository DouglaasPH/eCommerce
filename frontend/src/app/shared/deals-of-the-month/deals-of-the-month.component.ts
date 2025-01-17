import { CommonModule } from "@angular/common";
import { Component, NgModule } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'deals-of-the-month',
    standalone: true,
    imports: [RouterOutlet, CommonModule],
    templateUrl: './deals-of-the-month.component.html',
    styleUrl: './deals-of-the-month.component.scss',
})
export class DealsOfTheMonth {
    currentIndex: number = 1;
    porcentage: number = 0;    
    discount: number[] = [30, 40, 10]
    hasChanged: boolean = false;

    onButtonClickLeft() {
        if (this.currentIndex > 1) {
            this.triggerblinkEffect();
        }        
        this.currentIndex = (this.currentIndex > 1) ? this.currentIndex - 1 : this.currentIndex;
        this.porcentage = (this.porcentage !== 0) ? this.porcentage + 35 : 0;
    }

    onButtonCLickRight() {
        if (this.currentIndex < 3) {
                 this.triggerblinkEffect();   
        }        
        this.currentIndex = (this.currentIndex < 3) ? this.currentIndex + 1 : this.currentIndex;
        this.porcentage = (this.porcentage !== -70) ? this.porcentage - 35 : this.porcentage;        
    }

    calculateTransform() {
        return this.porcentage;
    }

    triggerblinkEffect() {
        this.hasChanged = true;
        setTimeout(() => {
            this.hasChanged = false
        }, 250);
    }
}