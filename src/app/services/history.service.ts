import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  url: string = 'http://localhost:1998/api/histories'
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  getHistory() {
    return this.http.get(`${this.url}/`)
  }

  addHistory(productId, totalProduct, totalPrice, payment, change) {
    return this.http.post(`${this.url}/`, { productId, totalProduct, totalPrice, payment, change })
  }
}
