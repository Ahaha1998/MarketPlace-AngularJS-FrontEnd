import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.get('noauth'))
      return next.handle(req.clone());
    else {
      const clonedreq = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + this.auth.getToken())
      });
      return next.handle(clonedreq).pipe(
        tap(
          event => { },
          err => {
            if (err.error.auth == false) {
              this.router.navigateByUrl('/login');
            }
          })
      );
    }
  }
}
