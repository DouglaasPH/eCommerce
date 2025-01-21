import { RouterModule, Routes } from '@angular/router';
import { LoginSignIn } from './pages/login-sign-in/login-sign-in.component';
import { LoginPageComponent } from './shared/component-login/login-component.component';
import { NgModule } from '@angular/core';
import { LoginForgetPassword } from './pages/login-forget-password/forget-password.component';
import { LoginConfirmCode } from './pages/login-confirm-code/confirm-code.component';
import { LoginEnterNewPassword } from './pages/login-enter-new-password/login-enter-new-password.component';
import { LoginSignUp } from './pages/login.sign-up/login-sign-up.component';
import { HomePage } from './pages/home-page/home-page.component';

export const routes: Routes = [
    { path: "", component: HomePage },    
    {
        path: "login", component: LoginPageComponent, children: [
            { path: "", redirectTo: "sign-in", pathMatch: "full" },
            { path: "sign-in", component: LoginSignIn },            
            { path: "sign-up", component: LoginSignUp },
            { path: "forget-password", children: [
                { path: "", component: LoginForgetPassword },
                {path: "confirm-code", children: [
                    { path: "", component: LoginConfirmCode },
                    { path: "enter-new-password", component: LoginEnterNewPassword },
                ]
                },
            ]},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}