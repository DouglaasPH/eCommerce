import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { editAddressService } from "../../../../services/editAddress.service";
import { ProcessPurchaseService } from "../../../../services/processPurchase.service";
import { editAdress } from "../../../address/components/edit-address/edit-address.component";
import { AddAddress } from "../../../address/components/add-address/add-address.component";
import { removeAddress } from "../../../../requests/addressRequest";
import { getUserData, removeAccount, updateAccountDetails } from "../../../../requests/userDataRequests";
import { FormsModule } from "@angular/forms";
import { checkLoggined } from "../../../../requests/loginRequests";
import { ChangeEmail } from "./change-email/change-email.component";
import { ChangePassword } from "./change-password/change-password.component";

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

interface userDataInterface {
    cpf: null | string;
    date_of_birth: string;
    email: string;
    gender: string;
    name: string;
    phone_number: string;
}

@Component({
    selector: 'my-data',
    standalone: true,
    imports: [CommonModule, FormsModule, editAdress, AddAddress, ChangeEmail, ChangePassword],
    templateUrl: './my-data.component.html',
    styleUrl: './my-data.component.scss',
})
export class MyData {
    constructor(private processPurchaseService: ProcessPurchaseService, private editAddressService: editAddressService) { }
    allAddress: any[] = [];
    statusEditAddress = false;
    statusAddAddress = false;
    statusChangeEmail = false;
    statusChangePassword = false;
    user_id = -1;
    userData: userDataInterface = {
        cpf: null,
        date_of_birth: "",
        email: "",
        gender: '',
        name: "",
        phone_number: ""
    };
    onValidName = false;
    onValidPhoneNumber = false;
    onValidGender = false;



    async ngOnInit() {
        await this.updateProperties();
        const response = await getUserData(this.user_id);
        this.userData = response;
    }

    async updateProperties() {
        const response = await this.processPurchaseService.getAllProperties();
        console.log(response)
        if (response.allAddress === null) {
            this.allAddress = [];            
        } else {
            this.allAddress = response.allAddress;
        }
        this.user_id = response.user_id;
    }

    onInputPhoneNumber(event: Event): void {
        const inputValue = (event.target as HTMLInputElement).value;
        if (inputValue.length < 15) {
            this.onValidPhoneNumber = true;
        } else {
            this.onValidPhoneNumber = false;
        }
        // CONDITIONS TO ADD NEW VALUE
        if (inputValue.length === 1 && this.userData.phone_number.length === 0) {
            this.userData.phone_number = '(' + inputValue;
        } else if (inputValue.length === 3 && this.userData.phone_number.length === 2) {
            this.userData.phone_number = inputValue.concat(') ');
        } else if (inputValue.length === 11 && this.userData.phone_number.length === 10) {
            this.userData.phone_number = inputValue.substring(0, 10) + '-' + inputValue.substring(10, 11);
        }
        // CONDITIONS TO REMOVE VALUE
        else if (inputValue.length === 1 && this.userData.phone_number.length === 2) {
            this.userData.phone_number = '';
        } else if (inputValue.length === 4 && this.userData.phone_number.length === 5) {
            this.userData.phone_number = this.userData.phone_number.substring(0, 2);
        } else if (inputValue.length === 11 && this.userData.phone_number.length === 12) {
            this.userData.phone_number = inputValue.substring(0, 10);
        }
        // JUST ADD THE NUMBER ENTERED;
        else {            
            this.userData.phone_number = inputValue;
        }
    }
    
    onCheckInputName() {
        if (this.userData.name.length > 0) {
            this.onValidName = false;
        } else {
            this.onValidName = true;
        }
    }

    onCheckInputGender() {
        if (this.userData.gender.length > 0) {
            this.onValidGender = false;
        } else {
            this.onValidGender = true;
        }        
    }

    onEditAddress(currentAddress: AddressInterface) {
        this.editAddressService.setAdress(currentAddress);
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

    async checkLogin() {
        const isLoggined = await checkLoggined();
        return isLoggined.isLogginned;
    }

    async onSaveChanges() {
        const isLoggined = await this.checkLogin();
        if (isLoggined && !this.onValidGender && !this.onValidName && !this.onValidPhoneNumber) {
            await updateAccountDetails(this.userData, this.user_id);
        } else return;
    }

    async onRemoveAccount() {
        const isLoggined = await this.checkLogin();

        if (isLoggined) {
            await removeAccount(this.user_id);
            sessionStorage.clear();
            window.location.reload();
        } else return;
    }    

    setStatusChangeEmail() {
        this.statusChangeEmail = !this.statusChangeEmail;
    }

    setStatusChangePassword() {
        this.statusChangePassword = !this.statusChangePassword;
        console.log(this.statusChangePassword)
    }        
}


// regex for email ^\d{3}\.\d{3}\.\d{3}-\d{2}$