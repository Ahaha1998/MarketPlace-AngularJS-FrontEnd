import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommentService } from '../../services/comment.service';
import { CartService } from '../../services/cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  quan = new FormGroup({
    quantity: new FormControl('', Validators.required)
  })

  dataPro: any
  isThisUser: boolean
  morePro: any
  commentData: any
  idPro: any
  cartDa: any
  dummy: any
  isLoggedIn: boolean
  Msg: string

  constructor(
    private productSer: ProductService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private auth: AuthService, 
    private comSer: CommentService, 
    private cartSer: CartService
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.checkLogin()
    this.idPro = this.route.snapshot.paramMap.get('id')
    this.productSer.getSingleProduct(this.idPro).subscribe(
      res => {
        this.dataPro = res
        let idUser = this.dataPro['seller']._id
        this.productSer.getProductByThis(idUser).subscribe(
          res => {
            this.morePro = res
            this.comSer.getComment(this.idPro).subscribe(
              res => {
                this.commentData = res
                this.checkData()
                this.checkUserData()
              }, err => {
                console.log(err)
              })
          }, err => {
            console.log(err)
          }
        )
      }, err => {
        console.log(err)
      })
  }

  checkLogin() {
    if (!this.auth.isLoggedIn()) {
      return false
    } else {
      return true
    }
  }

  checkUserData() {
    this.dummy = this.auth.getUserPayload()
    if (this.dataPro['seller']._id == this.dummy['data']._id) {
      this.isThisUser = true
    } else {
      this.isThisUser = false
    }
  }

  addComments(comment) {
    this.comSer.addComment(this.idPro, comment).subscribe(
      res => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(
          () => this.router.navigate(['/product', this.idPro])); 
        console.log(res)
      }, err => {
        console.log(err)
      }
    )
  }

  checkData() {
    let data = this.morePro.find(ob => ob['_id'] === this.idPro);
    if (data) {
      const index: number = this.morePro.indexOf(data);
      this.morePro.splice(index, 1);
    }
  }

  addCarts(quantity: number) {
    if (quantity > 0) {
      let totalPri = this.dataPro.price * quantity
      this.cartSer.addCart(this.idPro, quantity, totalPri).subscribe(
        res => {
          let totalPro = this.dataPro.stock - quantity
          this.productSer.editProduct(this.idPro, this.dataPro.productName, this.dataPro.detail, this.dataPro.price, totalPro).subscribe(
            res => {
              window.location.href = '/cart'
            }, err => {
              console.log(err)
            }
          )
        }, err => {
          console.log(err)
        }
      )
    } else {
      this.Msg = "Please enter the right value!"
    }
  }

}
