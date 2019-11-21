import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'http://localhost:1998/api/users'
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  addUser(username, email, password) {
    return this.http.post(`${this.url}/`, {username, email, password}, this.noAuthHeader)
  }

  updateProfile(username, email, address, phone, gender) {
    return this.http.put(`${this.url}/profile`, {username, email, address, phone, gender})
  }

  getUserProfile() {
    return this.http.get(`${this.url}/profile`)
  }

  uploadUserPhoto(photo) {
    return this.http.post(`${this.url}/upload`, photo)
  }

  getUserPhoto() {
    return this.http.get(`${this.url}/upload`)
  }

  getUserById(id) {
    return this.http.get(`${this.url}/${id}`)
  }

  // deleteUser(id) {
  //   return this.http.get(`${this.url}/admin/${id}`);
  // }
}
