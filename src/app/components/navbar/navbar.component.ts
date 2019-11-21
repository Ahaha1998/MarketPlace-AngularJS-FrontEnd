import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin: boolean

  constructor(private auth: AuthService, private route: Router, private locate: Location) { }

  ngOnInit() {
    this.isLogin = this.checkLogin()
  }

  checkLogin() {
    if (!this.auth.isLoggedIn()) {
      return false
    }else {
      return true
    }
  }

  onLogout() {
    this.isLogin = this.checkLogin()
    this.auth.deleteToken()
    window.location.href = '/login'
  }

  inCreate() {
    if (this.route.url === '/create') {
      return true
    }
    return false
  }

  backToPast() {
    this.locate.back()
  }

}
