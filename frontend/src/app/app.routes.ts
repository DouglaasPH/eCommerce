import { RouterModule, Routes } from '@angular/router';
import { LoginSignIn } from './pages/login-sign-in/login-sign-in.component';
import { LoginPageComponent } from './shared/component-login/login-component.component';
import { NgModule } from '@angular/core';
import { LoginForgetPassword } from './pages/login-forget-password/forget-password.component';
import { LoginConfirmCode } from './pages/login-confirm-code/confirm-code.component';
import { LoginEnterNewPassword } from './pages/login-enter-new-password/login-enter-new-password.component';
import { LoginSignUp } from './pages/login.sign-up/login-sign-up.component';
import { HomePage } from './pages/home-page/home-page.component';
import { ShopPage } from './pages/shop/shop-page.component';
import { ProductPage } from './pages/product/product.component';
import { ShoppingCart } from './shared/shopping-cart/shopping-cart.component';
import { MyShoppingCart } from './pages/my-shopping-cart/my-shopping-cart.component';
import { Checkout } from './pages/checkout/checkout.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: "", component: HomePage },    
    {
        path: "login", component: LoginPageComponent, children: [
            { path: "", redirectTo: "sign-in", pathMatch: "full" },
            { path: "sign-in", component: LoginSignIn, canActivate: [AuthGuard] },            
            { path: "sign-up", component: LoginSignUp, canActivate: [AuthGuard] },
            { path: "forget-password", children: [
                { path: "", component: LoginForgetPassword, canActivate: [AuthGuard] },
                {path: "confirm-code", children: [
                    { path: "", component: LoginConfirmCode, canActivate: [AuthGuard] },
                    { path: "enter-new-password", component: LoginEnterNewPassword, canActivate: [AuthGuard] },
                ]
                },
            ]},
        ], canActivate: [AuthGuard]
    },
    { path: 'shop', component: ShopPage },
    {
        path: 'shop/product', component: ProductPage, children: [
            { path: 'shopping-cart', component: ShoppingCart }
        ]
    },
    { path: 'my-shopping-cart', component: MyShoppingCart },
    { path: 'checkout', component: Checkout },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}