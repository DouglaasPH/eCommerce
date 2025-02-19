import { Component } from "@angular/core";
import { navBar } from "../../shared/nav-bar/nav-bar.component";
import { FooterBar } from "../../shared/footer-bar/footer-bar.component";
import { CommonModule } from "@angular/common";
import { OrderSumaryService } from "../../services/orderSumary.service";
import { orderSumary } from "../../shared/orderSumary/orderSumary.component";
import { OrderDataService } from "../../services/orderDatas.service";

@Component({
    selector: 'shipping',
    standalone: true,
    imports: [navBar, FooterBar, orderSumary, CommonModule],
    templateUrl: './shipping.component.html',
    styleUrl: './shipping.component.scss'
})
export class Shipping {
    constructor(private orderSumaryService: OrderSumaryService, private orderDataService: OrderDataService) {}

    shipments = [
        {
            valueShipment: 'Free',
            shipmentType: 'Regular',
            deliveryData: '01, Feb, 2025',
        },
        {
            valueShipment: '8.50',
            shipmentType: 'Priority',
            deliveryData: '28, Jan, 2025',
        }
    ];

    chosenDelivery = -1;

    setChooseDelivery(index: number) {
        this.chosenDelivery = index;
        this.orderDataService.updateShipping(this.shipments[index]);
        this.orderSumaryService.setChosenDelivery(this.chosenDelivery);
    }}