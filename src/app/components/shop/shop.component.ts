import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { HistoryService } from '../../services/history.service'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  idUser: any
  dataPro: any
  hisDat: any

  constructor(
    private proSer: ProductService, 
    private route: Router, 
    private userSer: UserService, 
    private hisSer: HistoryService, 
    private auth: AuthService) {
    this.hisSer.getHistory().subscribe(
      res => {
        this.hisDat = res
      }, err => {
        console.log(err)
      }
    )
  }

  ngOnInit() {
    let userStore = this.auth.getUserPayload()
    let idStore = userStore['data']._id
    this.userSer.getUserById(idStore).subscribe(
      res => {
        this.idUser = res
        this.proSer.getProductByThis(this.idUser._id).subscribe(
          res => {
            this.dataPro = res
          }, err => {
            console.log(err)
          }
        )
      }, err => {
        console.log(err)
      }
    )
  }

}
