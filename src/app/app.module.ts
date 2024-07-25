import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import {LoginComponent} from "./components/login/login";
import {HomeComponent} from "./components/home/home";
import {HeaderComponent} from "./components/header/header";
import {FooterComponent} from "./components/footer/footer";
import {CartComponent} from "./components/cart/cart";
import {CarritoComponent} from "./components/carrito/carrito";
import {ClubsComponent} from "./components/clubs/clubs";
import { AlertComponent } from './components/alert/alert.component';
import {NoticiasComponent} from "./components/noticias/noticias";
import { PickupFormComponent } from './pickup-form/pickup-form.component';
import { DeliveryFormComponent } from './delivery-form/delivery-form.component';
import { PaymentComponent } from './payment/payment.component';
import { Alert2Component } from './alert2/alert2.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, HomeComponent, HeaderComponent, FooterComponent, CartComponent, CarritoComponent,
    ClubsComponent, AlertComponent, NoticiasComponent, PickupFormComponent, DeliveryFormComponent, PaymentComponent, Alert2Component, PaymentHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
