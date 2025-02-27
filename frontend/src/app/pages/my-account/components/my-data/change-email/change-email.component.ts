import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { checkLoggined } from "../../../../../requests/loginRequests";
import { checkPassword, updateAccountDetails } from "../../../../../requests/userDataRequests";

@Component({
    selector: 'change-email',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './change-email.component.html',
    styleUrl: './change-email.component.scss'
})
export class ChangeEmail {
    @Input() currentEmail: string = ''; 
    @Output() setStatusChangeEmail = new EventEmitter();     
    newEmail = '';
    confirmNewEmail = '';
    password = '';


    async checkLogin() {
        const isLoggined = await checkLoggined();
        return isLoggined.id;
    }

    async onConfirm() {
        console.log(this.currentEmail, this.password)
        const onPassword = await checkPassword(this.currentEmail, this.password);

        if (onPassword.length > 0) {
            const user_id = await this.checkLogin();
            const regexForEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (this.newEmail === this.confirmNewEmail && regexForEmail.test(this.confirmNewEmail)) {
                await updateAccountDetails({ email: this.confirmNewEmail }, user_id);
                this.setStatusChangeEmail.emit()
                window.location.reload();
            }
        } else return;
    }

    closePage() {
        this.setStatusChangeEmail.emit();
    }
}