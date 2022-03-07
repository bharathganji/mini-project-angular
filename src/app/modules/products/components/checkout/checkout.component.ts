import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
// import('./checkout.js');

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cookieValue!: any;
  constructor(
    private ProductService: ProductService,
    private router: Router,
    private userservice: UserService,
    private cookiService: CookieService
  ) {
    this.cookieValue = this.cookiService.get('username'); // To Get Cookie
  }
  cartarray!: any[];
  totalcartvalue = 0;

  ngOnInit(): void {
    this.cartarray = this.ProductService.getAllProductsFromCart();
    this.total();
  }
  total() {
    this.totalcartvalue = this.cartarray.reduce(function (accumulator, item) {
      return accumulator + item.price;
    }, 0);
  }

  // deletecart() {
  //   this.ProductService.resetcart();
  // }

  isLoading = false;

  button = 'Purchase';

  click() {
    this.isLoading = true;
    this.button = 'Processing';
    this.ProductService.resetcart();

    setTimeout(() => {
      this.isLoading = false;
      this.button = 'Submit';
      this.router.navigate(['products/success']);

      this.userservice
        .insertorderdetails({
          username: this.cookieValue,
          orderdetails: this.cartarray,
        })
        .subscribe(
          (result) => {
            console.log('from send mail success componet ');
            console.log(JSON.stringify(result) + 'result');
          },
          (err) => {
            console.log(err);
          }
        );
    }, 3000);
  }
}
