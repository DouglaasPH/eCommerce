import { RouterModule, Routes } from '@angular/router';
import { LoginSignIn } from './pages/login-sign-in/login-sign-in.component';
import { LoginPageComponent } from './shared/component-login/login-component.component';
import { NgModule } from '@angular/core';
import { LoginForgetPassword } from './pages/login-forget-password/forget-password.component';
import { LoginConfirmCode } from './pages/login-confirm-code/confirm-code.component';
import { LoginEnterNewPassword } from './pages/login-enter-new-password/login-enter-new-password.component';
import { LoginSignUp } from './pages/login.sign-up/login-sign-up.component';
import { HomePage } from './pages/home/home-page.component';
import { ShopPage } from './pages/shop/shop-page.component';
import { ProductPage } from './pages/product/product.component';
import { ShoppingCart } from './pages/shopping-cart/shopping-cart.component';
import { AuthGuard } from './guards/auth.guard';
import { ConfirmCodeGuard } from './guards/confirmCode.guard';
import { EnterNewPasswordGuard } from './guards/enterNewPassword.guard';
import { ShoppingCartGuard } from './guards/shoppingCart.guard';
import { Address } from './pages/address/address.component';
import { Shipping } from './pages/shipping/shipping.component';
import { Payment } from './pages/payment/payment.component';
import { AddressGuard } from './guards/address.guard';
import { ShippingGuard } from './guards/shipping.guard';
import { PaymentGuard } from './guards/payment.guard';
import { MyAccountPage } from './pages/my-account/my-account.component';
import { Details } from './pages/my-account/components/my-orders/details/details.component';
import { MyData } from './pages/my-account/components/my-data/my-data.component';
import { MyOrders } from './pages/my-account/components/my-orders/my-orders.component';
import { Favorites } from './pages/my-account/components/favorites/favorites.component';

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
                    { path: "", component: LoginConfirmCode, canActivate: [ConfirmCodeGuard] },
                    { path: "enter-new-password", component: LoginEnterNewPassword, canActivate: [EnterNewPasswordGuard] },
                ]
                },
            ]},
        ], canActivate: [AuthGuard]
    },
    { path: 'shop', component: ShopPage },
    { path: 'shop/product/:productId', component: ProductPage },
    { path: 'shopping-cart', component: ShoppingCart, canActivate: [ShoppingCartGuard] },
    { path: 'shopping-cart/address', component: Address, canActivate: [AddressGuard] },
    { path: 'shopping-cart/address/shipping', component: Shipping, canActivate: [ShippingGuard] },    
    { path: 'shopping-cart/address/shipping/payment', component: Payment, canActivate: [PaymentGuard] },

    {
        path: 'my-account', component: MyAccountPage, children: [
            { path: 'my-data', component: MyData },
            { path: 'my-orders', component: MyOrders },
            { path: 'my-orders/details/:order_id', component: Details },
            { path: 'favorites', component: Favorites }
    ], /*canActivate: [AuthGuard]*/ },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}