import { Component, HostListener, OnInit } from "@angular/core";
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
    styleUrls: ['./my-account.component.scss', './media-queries-for-my-account.component.scss'],
})
export class MyAccountPage implements OnInit {
    constructor(private route: ActivatedRoute) { }
    currentSection = '';
    ordersQuantity = 0;
    itemsOrdersQuantity = 0;
    currentOrderIdFromDetails = 0;
    quantityOfItemsForDetails = 0;
    quantityOfFavoriteProducts = 0;
    isHoveringOverTheNavBar = false;

    @HostListener('window:resize', ['$event '])

    getHeightForMain() {
        /* Tweaks for desktop  */
        if (window.innerWidth > 850) {
            return this.currentSection === 'my-orders' && this.ordersQuantity > 0 ? ((this.itemsOrdersQuantity * 12) + (this.ordersQuantity * 6)) + 'vw' : this.currentSection === 'my-orders' && this.ordersQuantity === 0 ? 30 + 'vw' : this.currentSection === 'details' ? ((this.quantityOfItemsForDetails * 8) + 32) + 'vw' : this.currentSection === 'my-data' ? '50vw' : this.currentSection === 'favorites' && this.quantityOfFavoriteProducts > 0 ? ((this.quantityOfFavoriteProducts * 10) + 10) + 'vw' : this.currentSection === 'favorites' && this.quantityOfFavoriteProducts === 0 ? 30 + 'vw' : null
        }
        /* Tweaks for cell phones */
        else if (window.innerWidth <= 500) {
            return this.currentSection === 'my-orders' && this.ordersQuantity > 0 ? ((this.itemsOrdersQuantity * 21) + (this.ordersQuantity * 9)) + 'vw' : this.currentSection === 'my-orders' && this.ordersQuantity === 0 ? 100 + 'vw' : this.currentSection === 'details' ? ((this.quantityOfItemsForDetails * 15) + 126) + 'vw' : this.currentSection === 'my-data' ? '280vw' : this.currentSection === 'favorites' && this.quantityOfFavoriteProducts > 0 ? ((this.quantityOfFavoriteProducts * 18) + 10) + 'vw' : this.currentSection === 'favorites' && this.quantityOfFavoriteProducts === 0 ? 100 + 'vw' : null
        }
        // TODO
        /* Tweaks for tablets */
        else {
            return '11vw';
        };
    }

    getHeightForLeftNavBar() {
        const heightForMain = this.getHeightForMain();
        const number = Number(heightForMain?.match(/\d+/)?.[0] ?? null);

        return (number - 15) + 'vw'
    }

    getWidthForNavBar() {
        if (this.isHoveringOverTheNavBar) {
            /* Tweaks for desktop  */
            if (window.innerWidth > 850) {
                return '18vw';
            }
            /* Tweaks for cell phones */
            else if (window.innerWidth <= 500) {
                return '40vw'
            }
            // TODO
            /* Tweaks for tablets */
            else {
                return '18vw';
            };
        } else {
            /* Tweaks for desktop  */
            if (window.innerWidth > 850) {
                return '5vw';
            }
            /* Tweaks for cell phones */
            else if (window.innerWidth <= 500) {
                return '9vw'
            }
            // TODO
            /* Tweaks for tablets */
            else {
                return '18vw';
            };            
        }       
    }    

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

        this.getHeightForMain();
    }
}

//currentSection === 'my-orders' && ordersQuantity > 0 ? ((itemsOrdersQuantity * 12) + (ordersQuantity * 6) ) + 'vw' : currentSection === 'my-orders' && ordersQuantity === 0 ? 30 + 'vw' :  currentSection === 'details' ? ((quantityOfItemsForDetails * 8) + 32) + 'vw'  : currentSection === 'my-data' ? '50vw' : currentSection === 'favorites' && quantityOfFavoriteProducts > 0 ? ((quantityOfFavoriteProducts * 10) + 10) + 'vw' : currentSection === 'favorites' && quantityOfFavoriteProducts === 0 ? 30 + 'vw' : null