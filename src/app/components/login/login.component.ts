import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  faLock = faLock;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    private auth: AuthService,
    private router: Router,
    private userservice: UserService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/products']);
    }
  }

  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     this.auth.login(this.loginForm.value).subscribe(
  //       (result) => {
  //         console.log(result);
  //         this.router.navigate(['/products']);
  //       },
  //       (err: Error) => {
  //         alert(err.message);
  //       }
  //     );
  //   }
  // }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.userservice.validate(this.loginForm.value).subscribe(
        (result:any) => {
          if (result.includes('validated')) {
            this.auth.setToken();
            this.cookieService.set( 'username',this.loginForm.value.email);
            // this.cookieService.set( 'result',JSON.stringify( result));
            this.router.navigate(['/products']);
          } else {
            alert('no user found');
          }
        },
        (err: Error) => {
          alert(err.message);
        }
      );
    }
  }
}
