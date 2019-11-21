import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = 'http://localhost:1998/api/users'
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  loginUser(data) {
    return this.http.post(`${this.url}/login`, data, this.noAuthHeader)
  }

  saveToken(token: string) {
    localStorage.setItem('token', token)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getUserPayload() {
    var token = this.getToken()
    if (token) {
      var userPayload = atob(token.split('.')[1])
      return JSON.parse(userPayload)
    }
    else
      return null
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload()
    if (userPayload)
      return userPayload.exp > Date.now() / 1000
    else
      return false
  }

  deleteToken() {
    localStorage.removeItem('token')
  }
}
