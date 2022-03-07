import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { KidsComponent } from './components/kids/kids.component';
import { MenComponent } from './components/men/men.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ProductsDashboardComponent } from './components/products-dashboard/products-dashboard.component';
import { SuccessComponent } from './components/success/success.component';
import { WomenComponent } from './components/women/women.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsDashboardComponent,

    children: [
      { path: 'men', component: MenComponent },
      { path: 'home/men', component: MenComponent },
      { path: 'home', component: CarouselComponent },
      { path: 'women', component: WomenComponent },
      { path: 'home/women', component: WomenComponent },
      { path: 'kids', component: KidsComponent },
      { path: 'home/kids', component: KidsComponent },
      { path: 'home/checkout', component: CheckoutComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'success', component: SuccessComponent },
      { path: 'home/success', component: SuccessComponent },
      { path: 'home/orderdetails', component: OrderDetailsComponent },
      { path: 'orderdetails', component: OrderDetailsComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
