import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() isLogin: EventEmitter<any> = new EventEmitter(); 
  loginForm: FormGroup
  errMsg: string

  constructor(private fb: FormBuilder, private route: Router, private auth: AuthService) {
    this.createForm()
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit() {
    if (this.auth.isLoggedIn())
      this.route.navigateByUrl('/profile');
  }

  login(data: FormGroup) {
    this.auth.loginUser(data.value).subscribe(
      res => {
        this.auth.saveToken(res['token'])
        window.location.href = '/'
      }, err => {
        this.errMsg = err.error.message
      })
  }

}
