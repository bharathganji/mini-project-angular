import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private userservice: UserService) {}

  token = 'abcdefghijklmnopqrstuvwxyz';

  // setToken(token: string): void {

  //   localStorage.setItem('token', token);
  // }
  setToken(): void {
    localStorage.setItem('token', this.token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  // login({ email, password }: any): Observable<any> {

  //   console.log(1);

  //   this.userservice.validate({ email, password }).subscribe({
  //     next: (data: any) => {
  //       console.log(2, data);

  //       if (data == 'validated') {
  //         console.log(3);

  //         this.setToken('abcdefghijklmnopqrstuvwxyz');
  //         return of({ name: 'Bharath Ganji', email: 'admin' });
  //       } else {
  //         console.log(4);

  //         return throwError(new Error('Failed to login'));
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err);
  //       alert(err);
  //     },
  //   });
  //   console.log('5');

  //   return throwError(new Error('Failed to login'));
  // }

  // login({ email, password }: any): Observable<any> {
  //   if (email === 'admin' && password === 'admin') {
  //     this.setToken('abcdefghijklmnopqrstuvwxyz');
  //     return of({ name: 'Bharath Ganji', email: 'admin' });
  //   }
  //   return throwError(new Error('Failed to login'));
  // }
}
