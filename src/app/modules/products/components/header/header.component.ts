import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';



import {
  faSignOutAlt,
  IconDefinition,
  faShoppingCart,faShoppingBag,
  faChild,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit,DoCheck  {
  faSignOutAlt = faSignOutAlt as IconDefinition;
  faShoppingBag = faShoppingBag as IconDefinition;
  faChild = faChild as IconDefinition;
  cartarray!: any[];
  constructor(
    private auth: AuthService,
    private router: Router,
    private productservice: ProductService,
    private cookieService: CookieService
  ) {}

  ngDoCheck(): void {
    if(this.productcount!=this.productservice.getproductcount())
    {this.productcount=this.productservice.getproductcount()}
  }
  faShoppingCart = faShoppingCart as IconDefinition;
  productcount: number = 0;
  totalcartvalue = 0;

  total() {
    this.totalcartvalue = this.cartarray.reduce(function (accumulator, item) {
      return accumulator + item.price;
    }, 0);
  }
  // quantity:number=1;

  ngOnInit(): void {
    this.opencarousel();
    
  }
  logout(): void {
    this.cookieService.deleteAll('/');
    this.cookieService.deleteAll('/products');
    this.auth.logout();

  }
  opencarousel() {
    this.router.navigate(['products/home']);
  }
  loadcartarray() {
    this.cartarray = this.productservice.getAllProductsFromCart();
    this.total();
    this.productcount = this.productservice.getproductcount();
  }
  deleteincart(index: number) {
    this.cartarray.splice(index, 1);
    this.productservice.deletefromCart(index);
    this.total();
  }
  // indexTracker(index: number, cartitem: any) {
  //   return cartitem;
  // }
}
