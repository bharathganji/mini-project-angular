import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpclient: HttpClient) {}

  baseURL = 'http://localhost:8001/';

  cartArray: any[] = [];

  getAllKidsProducts():Observable<any> {
    let url = this.baseURL + 'getAllKidsProducts';

    return this.httpclient.get(url);
  }
  getAllWomenProducts() :Observable<any>{
    let url = this.baseURL + 'getAllWomenProducts';

    return this.httpclient.get(url);
  }
  getAllMenProducts():Observable<any>{
    let url = this.baseURL + 'getAllMenProducts';

    return this.httpclient.get(url);
  }

  getAllProductsFromCart() {
    return this.cartArray;
  }

  addProductstoCart(productObj: any) {
    this.cartArray.push(productObj);
  }
deletefromCart(index:number){
  this.cartArray.splice(index,1);
}
  getproductcount() {
    return this.cartArray.length;
  }

  resetcart(){
    this.cartArray=[];
  }
}
