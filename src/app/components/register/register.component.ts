import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup

  constructor(private fb: FormBuilder, private route: Router, private userSer: UserService) {
    this.createForm()
  }

  createForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
    })
  }

  ngOnInit() {
  }

  addUser(username, email, password) {
    this.userSer.addUser(username, email, password).subscribe(data => {
      if(data) {
        this.route.navigateByUrl('/login')
      }else {
        this.route.navigateByUrl('/register')
      }
    })
  }

}
