import { Component, OnInit } from "@angular/core";
import { navBar } from "../../shared/nav-bar/nav-bar.component";
import { CommonModule } from "@angular/common";
import { FooterBar } from "../../shared/footer-bar/footer-bar.component";
import { removeAddress } from "../../requests/addressRequest";
import { editAdress } from "./components/edit-address/edit-address.component";
import { editAddressService } from "../../services/editAddress.service";
import { AddAddress } from "./components/add-address/add-address.component";
import { OrderSumaryService } from "../../services/orderSumary.service";
import { Router } from "@angular/router";

interface AddressInterface {
    cep: string;
    sender: string,
    contact: string,
    logradouro: string,
    number: string,
    complement: string,
    reference: string,
    neighborhood: string,
    city: string,
    uf: string,    
}

interface Product {
    id: number;
    description: string;
    mark: string;
    price: number;
    images_path: string[];
    size_by_quantity: { [key: string]: string }
    discount_percentage: number
}

@Component({
    selector: 'address',
    standalone: true,
    imports: [navBar, FooterBar, CommonModule, editAdress, AddAddress],
    templateUrl: './address.component.html',
    styleUrl: './address.component.scss'
})
export class Address implements OnInit {
    constructor(private editaddressservice: editAddressService, private orderSumaryService: OrderSumaryService, private router: Router) {}
    shoppingCart: any[] = [];
    productData: Product[] = [];
    orderSumary = {
        fullPriceWithoutDiscount: 0,
        discount: 0,
        shipping: "undefined",
        couponApplied: 0,
        total: 0,
        estimatedDelivery: "undefined",        
    }
    allAddress: any[] = [];
    statusEditAddress = false;
    statusAddAddress = false;
    user_id = -1;

    chosenAddress = -1;

    async ngOnInit(): Promise<void> {
        await this.updateProperties();
    }

    async updateProperties() {
        const response = await this.orderSumaryService.getAllProperties();
        this.shoppingCart = response.shoppingCart;
        this.productData = response.productData;
        this.orderSumary = response.orderSumary;
        this.allAddress = response.allAddress;
        this.user_id = response.user_id;
    }

    setChooseAddress(index: number) {
        this.chosenAddress = index;
    }    

    onEditAddress(currentAddress: AddressInterface) {
        this.editaddressservice.setAdress(currentAddress);
        this.statusEditAddress = true;
    }

    setStatusEditAddress() {
        this.statusEditAddress = !this.statusEditAddress;
    }

    setStatusAddAddress() {
        this.statusAddAddress = !this.statusAddAddress;
    }

    async onRemoveAddress(address_position: number) {
        await removeAddress(address_position, this.user_id);
        window.location.reload();
    }

    async onContinueToShipping() {
        if (this.chosenAddress > -1) {
            sessionStorage.setItem('continueToShipping', 'true');
            this.router.navigate(['shopping-cart/address/shipping']);
        }
    }
}