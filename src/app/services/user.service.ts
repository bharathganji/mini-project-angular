import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from 'src/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpclient: HttpClient,private cookieService: CookieService) {}

  baseURL = 'http://localhost:8001/';

  getorderdetails(empObj: any):Observable<any>{
    let url = this.baseURL + 'orderdetails/'+empObj.username;
    return this.httpclient.get(url);
  }

  insertorderdetails(empObj: any):Observable<any>{
    let url = this.baseURL + 'insertorderdetails';
    let header = {
      'content-type': 'application/json',
    };
    let body = JSON.stringify(empObj);
    
    return this.httpclient.post(url, body, {
      headers: header,
      responseType: 'text',
    });
  }


  
  

  validate(empObj: any) {
    let url = this.baseURL + 'validate';
    console.log(JSON.stringify(empObj) + "userservicevalidate");

    let header = {
      'content-type': 'application/json',
    };

    let body = JSON.stringify(empObj);

    return this.httpclient.post(url, body, {
      headers: header,
      responseType: 'text',
    });
  }

  sendmail(email:any){
    let url = this.baseURL + 'sendmail';
    // let cookieValue = this.cookieService.get('username'); // To Get Cookie
    let body ={username: email};
    let header = {
      'content-type': 'application/json',
    };

    return this.httpclient.post(url, body, {
      headers: header,
      responseType: 'text',
    });
  }

  getAllEmployees() {
    let url = this.baseURL + 'getAllUsers';

    return this.httpclient.get(url);
  }

  getEmployeeId(uid: number) {
    let url = this.baseURL + 'getuserById/' + uid;
    return this.httpclient.get(url);
  }

  insertEMployee(empObj: user) {
    let url = this.baseURL + 'insertnewUser';
    console.log(JSON.stringify(empObj));

    let header = {
      'content-type': 'application/json',
    };

    let body = JSON.stringify(empObj);

    return this.httpclient.post(url, body, {
      headers: header,
      responseType: 'text',
    });
  }

  updateEmployee(empObj: user) {
    let url = this.baseURL + 'updateUser';

    return this.httpclient.put(url, empObj, { responseType: 'text' });
  }

  deleteEmployee(empid: number) {
    let url = this.baseURL + 'deleteUser/' + empid;
    return this.httpclient.delete(url, { responseType: 'text' });
  }
}
