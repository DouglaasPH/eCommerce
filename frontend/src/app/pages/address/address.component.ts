import { Component, OnInit } from "@angular/core";
import { navBar } from "../../shared/nav-bar/nav-bar.component";
import { CommonModule } from "@angular/common";
import { FooterBar } from "../../shared/footer-bar/footer-bar.component";
import { removeAddress } from "../../requests/addressRequest";
import { editAdress } from "./components/edit-address/edit-address.component";
import { editAddressService } from "../../services/editAddress.service";
import { AddAddress } from "./components/add-address/add-address.component";
import { ProcessPurchaseService } from "../../services/processPurchase.service";
import { FormsModule } from "@angular/forms";
import { OrderSumaryService } from "../../services/orderSumary.service";
import { orderSumary } from "../../shared/orderSumary/orderSumary.component";
import { OrderDataService } from "../../services/orderDatas.service";

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
@Component({
    selector: 'address',
    standalone: true,
    imports: [navBar, FooterBar, CommonModule, FormsModule, editAdress, AddAddress, orderSumary],
    templateUrl: './address.component.html',
    styleUrl: './address.component.scss'
})
export class Address implements OnInit {
    constructor(private editaddressservice: editAddressService, private processPurchaseService: ProcessPurchaseService, private orderSumaryService: OrderSumaryService, private orderDataService: OrderDataService) {}
    allAddress: any[] = [];
    statusEditAddress = false;
    statusAddAddress = false;
    user_id = -1;

    chosenAddress = -1;

    valueCoupon: number = 0;
    couponCodeInput: string = '';    

    async ngOnInit(): Promise<void> {
        await this.updateProperties();
    }

    async updateProperties() {
        const response = await this.processPurchaseService.getAllProperties();
        this.allAddress = response.allAddress;
        this.user_id = response.user_id;
    }
    
    setChooseAddress(index: number) {
        this.chosenAddress = index;
        this.orderDataService.updateAddress(this.allAddress[index]);
        this.orderSumaryService.setChooseAddress(index);
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
}