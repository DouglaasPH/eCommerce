import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { editAddressService } from "../../../../services/editAddress.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { updateAddress } from "../../../../requests/addressRequest";

interface address {
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
    selector: 'edit-address',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './edit-address.component.html',
    styleUrl: './edit-address.component.scss',
})
export class editAdress implements OnInit {
    @Input() user_id: number = 0; 
    @Input() address_position:number = 0; 
    @Output() setStatusEditAddress =  new EventEmitter(); 
    constructor(private editAddressService: editAddressService) { }
    editAddress: address = {
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
    newAddress: address = {
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

    ngOnInit(): void {
        const datas = this.editAddressService.getAddress();
        this.editAddress = datas;
        this.newAddress = {
            ...this.newAddress,
            complement: datas.complement,
            reference: datas.reference,
        };
        console.log(this.editAddress);
    }

    updateStatusEditAddress() {
        this.setStatusEditAddress.emit();
    }


    async onSubmitEditAddress() {
        const address = {
            ...this.editAddress,            
            complement: this.newAddress.complement,
            reference: this.newAddress.reference,            
        }
        await updateAddress(address, this.address_position, this.user_id);
        this.setStatusEditAddress.emit();
        window.location.reload();
    }
}