import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  constructor(private userservice:UserService,private cookieService: CookieService) {
     this.cookieValue = this.cookieService.get('username'); // To Get Cookie
  }
cookieValue:any;

  ngOnInit(): void {
    this.userservice.sendmail(this.cookieValue).subscribe(
      (result)=>{console.log("from send mail success componet ");
      console.log(JSON.stringify(result)+"result");
      
      },
      (err)=>{console.log(err);
      }
    )
    ;
    console.log('from success componet '+ this.cookieValue);
    
  }
}
