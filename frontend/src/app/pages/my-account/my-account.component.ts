import { Component, OnInit } from "@angular/core";
import { navBar } from "../../shared/nav-bar/nav-bar.component";
import { LeftNavBar } from "./left-nav-bar/left-nav-bar.component";
import { FooterBar } from "../../shared/footer-bar/footer-bar.component";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { checkLoggined } from "../../requests/forLogin";
import { getAllOrderItems, getAllOrders } from "../../requests/forUserData";
import { getAllFavoritesFromUser } from "../../requests/forFavorites";

interface Order {
    id: number
    created_at: string
    status: string
}

@Component({
    selector: 'my-account',
    standalone: true,
    imports: [CommonModule, navBar, LeftNavBar, FooterBar, RouterOutlet],
    templateUrl: './my-account.component.html',
    styleUrl: './my-account.component.scss'
})
export class MyAccountPage implements OnInit {
    constructor(private route: ActivatedRoute) { }
    currentSection = '';
    ordersQuantity = 0;
    itemsOrdersQuantity = 0;
    currentOrderIdFromDetails = 0;
    quantityOfItemsForDetails = 0;
    quantityOfFavoriteProducts = 0;

    async ngOnInit() {
        this.route.children.forEach(async child => {
            if (child.snapshot.url[1]?.path === 'details') {
                this.currentSection = 'details';
                this.currentOrderIdFromDetails = Number(child.snapshot.url[2]?.path);
                const response = await getAllOrderItems(this.currentOrderIdFromDetails);
                this.quantityOfItemsForDetails = response.length;
            } else {
                this.currentSection = child.snapshot.url[0]?.path;                
        }
    });

        if (this.currentSection === 'my-orders') {
            const first_response = await checkLoggined();
            const user_id = first_response.id;
        
            const second_response: Order[] = await getAllOrders(user_id);
            this.ordersQuantity = second_response.length;

            second_response.forEach(async order => {
                const third_response = await getAllOrderItems(order.id);
                this.itemsOrdersQuantity = third_response.length + this.itemsOrdersQuantity;
            });
        }

        if (this.currentSection === 'favorites') {
            const first_response = await checkLoggined();
            const user_id = first_response.id;

            const second_response = await getAllFavoritesFromUser(user_id);
            const isArray = JSON.parse(second_response.favorites);
            this.quantityOfFavoriteProducts = isArray.length;
        }
    }
}