import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = 'http://localhost:1998/api/products'
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  addProduct(productName, detail, category, price, stock) {
    return this.http.post(`${this.url}/`, {productName, detail, category, price, stock})
  }

  editProduct(id, productName, detail, price, stock) {
    return this.http.put(`${this.url}/${id}`, {productName, detail, price, stock})
  }

  getProduct() {
    return this.http.get(`${this.url}/`, this.noAuthHeader);
  }

  getSingleProduct(id) {
    return this.http.get(`${this.url}/${id}`, this.noAuthHeader)
  }

  getProductByThis(id) {
    return this.http.get(`${this.url}/user/${id}`, this.noAuthHeader)
  }

  uploadProductPhoto(photo, id) {
    return this.http.post(`${this.url}/upload/${id}`, photo)
  }

  deleteProduct(id) {
    return this.http.delete(`${this.url}/${id}`)
  }
}
