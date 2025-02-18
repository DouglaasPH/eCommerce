import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { addAddress } from "../../../../requests/addressRequest";
import { getAddress } from "../../../../requests/searchCepRequest";
//import { searchAddress } from "../../../../services/searchAddress.service";

interface addressInterface {
    cep: string,
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
    selector: 'add-address',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './add-address.component.html',
    styleUrl: './add-address.component.scss',
})
export class AddAddress {
    //constructor(private searchAddressSerive: searchAddress) {}
    @Input() user_id: number = 0; 
    @Output() setStatusAddAddress =  new EventEmitter();     
    address: addressInterface = {
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

    updateStatusAddsAddress() {
        this.setStatusAddAddress.emit();
    }

    async onSubmitAddAddress() {
        await addAddress(this.address, this.user_id);
        //this.setStatusAddAddress.emit();
        window.location.reload();   
    }

    async searchCep(cep: string) {
        console.log(this.user_id)
        const cepAddress = await getAddress(cep);
        console.log(cepAddress)
        this.address = {
            ...this.address,
            logradouro: cepAddress.logradouro,
            number: '',
            complement: '',
            reference: '',
            neighborhood: cepAddress.complemento,
            city: cepAddress.localidade,
            uf: cepAddress.uf,
        };
        console.log(this.address);
        //console.log( this.searchAddressSerive.searchCep(cep));
    }
}