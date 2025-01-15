import { RouterModule, Routes } from '@angular/router';
import { LoginSignUp } from './pages/login-sign-up/sign-up.component';
import { LoginPageComponent } from './shared/component-login/login-component.component';
import { NgModule } from '@angular/core';
import { LoginForgetPassword } from './pages/login-forget-password/forget-password.component';

export const routes: Routes = [
    {
        path: "login", component: LoginPageComponent, children: [
            { path: "", redirectTo: "sign-up", pathMatch: "full" },
            { path: "sign-up", component: LoginSignUp },            
            { path: "forget-password", component: LoginForgetPassword },   
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}