import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login";
import {HomeComponent} from "./components/home/home";
import {CartComponent} from "./components/cart/cart";
import {CarritoComponent} from "./components/carrito/carrito";
import {ClubsComponent} from "./components/clubs/clubs";
import {NoticiasComponent} from "./components/noticias/noticias";
import {AuthGuard} from "./auth.guard";
import {PickupFormComponent} from "./pickup-form/pickup-form.component";
import {DeliveryFormComponent} from "./delivery-form/delivery-form.component";
import {PaymentComponent} from "./payment/payment.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'carrito', component: CarritoComponent },
  { path: 'clubs', component: ClubsComponent, canActivate: [AuthGuard] },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'pickup', component: PickupFormComponent },
  { path: 'delivery', component: DeliveryFormComponent },
  { path: 'pago', component: PaymentComponent },

  // Define other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

