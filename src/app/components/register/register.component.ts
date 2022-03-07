import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { emailValidator } from './emailValidator';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  faLock = faLock;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private userservice: UserService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email,emailValidator ]],
      email: ['', [Validators.required, Validators.email, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });

    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/products']);
    }
  }

  onSubmit(form: FormGroup) {
    console.log(' is registeration form Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Email', form.value.email);
    console.log('password', form.value.password);
    if (!form.valid) {
      // console.log('Name', form.value.name);
      // console.log('Email', form.value.email);
      // console.log('password', form.value.password);
      alert(
        `Dear customer check entered email ${form.value.email} and password ${form.value.password}`
      );
    }
    // else {
    //   this.auth.login(this.registerForm.value).subscribe(
    //     (result) => {
    //       console.log(result);
    //       this.router.navigate(['/products']);
    //     },
    //     (err: Error) => {
    //       alert(`${err.message} `);
    //     });
    // }
    else {
      console.log(this.registerForm.value);
      this.userservice.insertEMployee(this.registerForm.value).subscribe(
        (result) => {
          if (result == 'success') {
            console.log(result);
            this.auth.setToken();
            alert("u r redirecting to homepage..")
            this.cookieService.set( 'username',this.registerForm.value.email);

            this.router.navigate(['/products']);
          } else {
            alert('failed contact admin');
          }
        },
        (err: Error) => {
          alert(`${err.message} `);
        }
      );
    }
  }
}
