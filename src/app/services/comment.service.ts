import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  url: string = 'http://localhost:1998/api/comments'
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  addComment(id, comment) {
    return this.http.post(`${this.url}/${id}`, {comment})
  }

  getComment(id) {
    return this.http.get(`${this.url}/${id}`)
  }

  deleteComment(id) {
    return this.http.delete(`${this.url}/${id}`)
  }
}
