import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { checkLoggined } from "../../../../../requests/forLogin";
import { checkPassword, updateAccountDetails } from "../../../../../requests/forUserData";

@Component({
    selector: 'change-password',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.scss'
})
export class ChangePassword {
    @Input() currentEmail: string = ''; 
    @Output() setStatusChangePassword = new EventEmitter();     
    newPassword = '';
    confirmNewPassword = '';
    currentPassword = '';


    async checkLogin() {
        const isLoggined = await checkLoggined();
        return isLoggined.id;
    }

    async onConfirm() {
        const onPassword = await checkPassword(this.currentEmail, this.currentPassword);

        if (onPassword.length > 0) {
            const user_id = await this.checkLogin();

            if (this.newPassword === this.confirmNewPassword) {
                await updateAccountDetails({ password: this.confirmNewPassword }, user_id);
                this.setStatusChangePassword.emit()
                window.location.reload();
            }
        } else return;
    }

    closePage() {
        this.setStatusChangePassword.emit();
    }    
}