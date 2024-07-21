import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import {LoginComponent} from "./components/login/login";
import {HomeComponent} from "./components/home/home";
import {HeaderComponent} from "./components/header/header";
import {FooterComponent} from "./components/footer/footer";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, HomeComponent, HeaderComponent, FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
