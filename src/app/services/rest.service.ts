import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from 'src/user';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private Http: HttpClient) {}
  url = 'http://localhost:3000/users';
  getUsers(): Observable<any> {
    return this.Http.get(this.url);
  }

  //deleting a record from json server
  deleteData(iRecordNum: string): Observable<any> {
    let deleurl = this.url + '/' + iRecordNum;
    return this.Http.delete(deleurl);
  }

  insertUser(uuserObj: user): Observable<any> {
    let header = { 'content-type': 'application/json' };
    let body = JSON.stringify(uuserObj);
    return this.Http.post(this.url, body, { headers: header });
  }
}
