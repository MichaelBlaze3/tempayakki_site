import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { MenuComponent } from './menu/menu.component';
import { ReservationComponent } from './reservation/reservation.component';
import { MessengerService } from './services/messenger.service';
import { StepOneComponent } from './reservation/step-one/step-one.component';
import { StepTwoComponent } from './reservation/step-two/step-two.component';
import { StepThreeComponent } from './reservation/step-three/step-three.component';
import { PhoneMaskDirective } from './phone-mask.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutUsComponent,
    ContactComponent,
    MenuComponent,
    ReservationComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    PhoneMaskDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  exports: [ PhoneMaskDirective ],
  providers: [ MessengerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
