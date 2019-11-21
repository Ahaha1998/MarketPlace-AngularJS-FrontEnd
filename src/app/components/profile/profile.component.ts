import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup
  userDetails: any
  image = null
  imgURL: String
  genderVal: String

  constructor(private fb: FormBuilder, private userSer: UserService, private route: Router) { }

  ngOnInit() {
    this.userSer.getUserProfile().subscribe(
      res => {
        this.userDetails = res
        this.imgURL = this.userDetails.photo
        this.createForm()
      },
      err => {
        console.log(err);
      })
  }

  onFileChanged(event) {
    this.image = event.target.files[0]
  }

  createForm() {
    this.profileForm = this.fb.group({
      username: [this.userDetails.username, Validators.required],
      email: [this.userDetails.email, Validators.email],
      address: [this.userDetails.address],
      phone: [this.userDetails.phone],
      gender: [this.userDetails.gender]
    })
  }

  updateProfile(username, email, address, phone) {
    this.userSer.updateProfile(username, email, address, phone, this.genderVal).subscribe(data => {
      if (data) {
        this.uploadPhoto()
        window.location.href = '/profile'
      } else {
        this.route.navigateByUrl('/profile')
      }
    })
  }

  uploadPhoto(){
    const uploadData = new FormData();
    uploadData.append('pImage', this.image, this.image.name);
    this.userSer.uploadUserPhoto(uploadData).subscribe(
      res => {
      console.log(res)
    }, err => {
      console.log(err)
    })
  }

  getRadioValue (event: any) {
    this.genderVal = event.target.value
    console.log(this.genderVal)
  }
}
