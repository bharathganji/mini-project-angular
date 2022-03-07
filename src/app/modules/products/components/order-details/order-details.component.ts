import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  orderArray: any = [];

  useremail!: any;
  constructor(
    private userservice: UserService,
    private cookieService: CookieService
  ) {
    this.useremail = this.cookieService.get('username');
  }

  ngOnInit(): void {
    // console.log('in order details.ts');
    // console.log(this.useremail);

    this.userservice.getorderdetails({ username: this.useremail }).subscribe(
      (data) => {
        data.forEach((element: any) => {
          element.orderdetails.forEach((ele: any) => {
            this.orderArray.push(ele);
          });
        });
      },
      (err) => console.log(err + 'from order details component')
    );
  }
}
