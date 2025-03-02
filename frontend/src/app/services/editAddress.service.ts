import { Injectable } from "@angular/core";

interface address {
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

@Injectable({
    providedIn: 'root',
})
export class editAddressService {
    private currentAddress: address = {
        cep: '',
        sender: '',
        contact: '',
        logradouro: '',
        number: '',
        complement: '',
        reference: '',
        neighborhood: '',
        city: '',
        uf: '',        
    };
    private onEditAddress = false;

    setAdress(address: address) {
        this.currentAddress = address;
        this.onEditAddress = true;
        console.log(this.currentAddress)
    }

    setStatusEditAddress() {
        this.onEditAddress = !this.onEditAddress;
    }

    getAddress() {
        return this.currentAddress;
    }

    getStatusEditAddress() {
        return this.onEditAddress;
    }
};