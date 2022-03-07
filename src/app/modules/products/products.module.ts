import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { MenComponent } from './components/men/men.component';
import { WomenComponent } from './components/women/women.component';
import { KidsComponent } from './components/kids/kids.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsDashboardComponent } from './components/products-dashboard/products-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SliderComponent } from './components/slider/slider.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatSlider, MatSliderModule } from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { SuccessComponent } from './components/success/success.component';
import { CookieService } from 'ngx-cookie-service';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

@NgModule({
  declarations: [
    MenComponent,
    WomenComponent,
    KidsComponent,
    FooterComponent,
    ProductsDashboardComponent,
    HeaderComponent,
    CarouselComponent,
    CheckoutComponent,
    SliderComponent,
    SuccessComponent,
    OrderDetailsComponent,
  ],
  imports: [
    CommonModule,
    
    ProductsRoutingModule,
    FontAwesomeModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
   
    MatSliderModule,
    NgxSliderModule,
    MatIconModule,

    FormsModule,
    MatExpansionModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  providers: [ CookieService ],
})
export class ProductsModule {}
