import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  url: string = 'http://localhost:1998/api/carts'
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  getCartData() {
    return this.http.get(`${this.url}/`)
  }

  addCart(id, totalProduct, totalPrice) {
    return this.http.post(`${this.url}/${id}`, { totalProduct, totalPrice })
  }

  deleteCartData(id) {
    return this.http.delete(`${this.url}/${id}`)
  }

  deleteAll() {
    return this.http.delete(`${this.url}/`)
  }
}
