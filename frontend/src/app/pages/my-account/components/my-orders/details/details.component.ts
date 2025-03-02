import { Component } from "@angular/core";
import { CommonModule, Location } from "@angular/common";
import { getAllOrderInformation, getAllOrderItems, getAllPaymentFromOrder, getProductInformation } from "../../../../../requests/forUserData";
import { ActivatedRoute, Router } from "@angular/router";
import { checkLoggined } from "../../../../../requests/forLogin";

interface Address {
    cep: string,
    city: string,
    complement: string,
    contact: string,
    logradouro: string,
    neighborhood: string,
    number: string,
    reference: string,
    sender: string,
    uf: string,
}

interface StatusHistory {
    status: string,
    updated_at: string,
}

interface Order {
    id: number,
    user_id: number,
    status: string,
    subtotal: number,
    shipping_price: string,
    discount: number,
    total: string,
    created_at: string,
    address: Address,
    coupon_applied: string,
    status_history: StatusHistory[],
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

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterStatus'
})
export class FilterStatusPipe implements PipeTransform {
  transform(statusHistory: any[], allowedStatuses: string[]): any[] {
    return statusHistory.filter(date => allowedStatuses.includes(date.status));
  }
}

@Component({
    selector: 'order-details',
    standalone: true,
    imports: [CommonModule, FilterStatusPipe],
    templateUrl: './details.component.html',
    styleUrl: './details.component.scss'
})
export class Details {
    constructor (private route: ActivatedRoute, private router: Router, private location: Location) {}

    currentOrderId: number = 0;
    order: Order = {
        id: 0,
        user_id: 0,
        status: '',
        subtotal: 0,
        shipping_price: '',
        discount: 0,
        total: '',
        created_at: '',        
        address: {
            cep: "",
            city: "",
            complement: "",
            contact: "",
            logradouro: "",
            neighborhood: "",
            number: "",
            reference: "",
            sender: "",
            uf: ""
        },
        coupon_applied: '',
        status_history: [],
    };
    allOrderItems: OrdersItems[] = [];
    allProductsFromOrders: Product[] = [];
    paymentsFromOrder: Payment = {
        id: 0,
        order_id: 0,
        payment_method: "",
        status: ""
    };
    productsId: number[] = [];

    async ngOnInit() {
        this.currentOrderId = Number(this.route.snapshot.paramMap.get('order_id')!);
        const checkUserId = await checkLoggined();
        const first_response = await getAllOrderInformation(this.currentOrderId);

        
        // check if the current order is from the user
        if (checkUserId.id === first_response.user_id) {
            this.order = {
                ...first_response,
                address: JSON.parse(first_response.address),
                status_history: JSON.parse(first_response.status_history),
            };
            console.log(this.order)
            
            const second_response = await getAllOrderItems(this.currentOrderId);
            second_response.forEach(async (item: OrdersItems) => {
                this.allOrderItems.push(item)

                if (!this.productsId.includes(item.product_id)) {
                    this.productsId.push(item.product_id);
                    const third_response = await getProductInformation(item.product_id);
                    this.allProductsFromOrders.push(third_response);
                } else return;
            });

            const fourth_response: Payment[] = await getAllPaymentFromOrder(this.currentOrderId);
            this.paymentsFromOrder = fourth_response[0];
        } else {
            this.router.navigate(['my-account/my-orders']);
            window.location.reload();
        }
    }

    returnToMyOrders() {
        this.location.replaceState('my-account/my-orders');
        window.location.reload();
    }
}