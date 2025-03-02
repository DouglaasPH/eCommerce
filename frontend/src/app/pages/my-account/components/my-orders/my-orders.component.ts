import { Component, OnInit } from "@angular/core";
import { getAllOrderItems, getAllOrders, getAllPaymentFromOrder, getProductInformation } from "../../../../requests/forUserData";
import { checkLoggined } from "../../../../requests/forLogin";
import { CommonModule, Location } from "@angular/common";
import { Router } from "@angular/router";

interface Order {
    id: number
    created_at: string
    status: string
}

interface Payment {
    id: number
    order_id: number
    payment_method: string
    status: string    
}

interface OrdersItems {
    id: number
    order_id: number
    price: number
    product_id: number
    quantity:number
    size: string
}

interface Product {
    id: number
    description: string
    images_path: string[]
}

@Component({
    selector: 'my-orders',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './my-orders.component.html',
    styleUrl: './my-orders.component.scss',
})
export class MyOrders implements OnInit {
    constructor(private router: Router, private location: Location) {}
    allOrders: Order[] = [];
    allOrdersItems: OrdersItems[] = [];
    allProductsFromOrders: Product[] = [];
    allPaymentsFromOrders: Payment[] = [];
    productsId: number[] = [];

    async ngOnInit() {
        const first_response = await checkLoggined();
        const user_id = first_response.id;
        
        const second_response: Order[] = await getAllOrders(user_id);
        second_response.forEach(async order => {
            this.allOrders.push({ id: order.id, created_at: order.created_at, status: order.status });
            
            const third_response = await getAllOrderItems(order.id);
            third_response.forEach(async (item: OrdersItems) => {
                this.allOrdersItems.push(item)

                if (!this.productsId.includes(item.product_id)) {
                    this.productsId.push(item.product_id);
                    const fourth_response = await getProductInformation(item.product_id);
                    this.allProductsFromOrders.push(fourth_response);
                } else return;
            });

            const fifth_response: Payment[] = await getAllPaymentFromOrder(order.id);
            this.allPaymentsFromOrders.push(fifth_response[0]);
        });
    }

    setHeight(order: Order) {
        let quantity = 0;
        for (const item of this.allOrdersItems) {
            if (item.order_id === order.id) quantity = quantity + 1;
        }
        return quantity
    }

    seeDetails(order_id: number) {
        this.location.replaceState('my-account/my-orders/details/' + order_id);
        window.location.reload();
    }
}