import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartData: any
  totalPriceProduct: number = 0
  Msg: string

  constructor(private route: Router, private router: ActivatedRoute, private cartSer: CartService, private productSer: ProductService, private hisSer: HistoryService) { }

  ngOnInit() {
    this.cartSer.getCartData().subscribe(
      res => {
        this.cartData = res
        this.Count()
      }, err => {
        console.log(err)
      }
    )
  }

  Count() {
    this.cartData.forEach((element) => {
      this.totalPriceProduct += element.totalPrice;
    });
  }

  plusQuantity() {
    this.cartData.totalProduct += 1
  }

  minQuantity(id) {
    let totalP = this.cartData.find(ob => ob['productId']._id === id)
    let totalPo = -1
    if (totalPo == 0) {
      this.cartSer.deleteCartData(totalP['productId']._id).subscribe(
        res => {
          let totalQ = totalP['productId'].stock + 1
          this.productSer.editProduct(totalP['productId']._id, totalP['productId'].productName, totalP['productId'].detail, totalP['productId'].price, totalQ).subscribe(
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
    }else {
      let totalPr = totalP['productId'].price * -1
      this.cartSer.addCart(id, totalPo, totalPr).subscribe(
        res => {
          let totalQ = totalP['productId'].stock + 1
          this.productSer.editProduct(totalP['productId']._id, totalP['productId'].productName, totalP['productId'].detail, totalP['productId'].price, totalQ).subscribe(
            res => {
              window.location.href = '/cart'
            }, err => {
              console.log(err)
            }
          )
          console.log(res)
        }, err => {
          console.log(err)
        })
    }
  }

  addHistories(pay) {
    if (pay >= this.totalPriceProduct) {
      let change = pay - this.totalPriceProduct
      this.cartSer.deleteAll().subscribe(
        res => {
          this.cartData.forEach((element) => {
            this.hisSer.addHistory(element['productId']._id, element.totalProduct, element.totalPrice, pay, change).subscribe(res => { console.log(res)}, err => { console.log(err) })
          })
          this.route.navigateByUrl('/shop')
          console.log(res)
        }, err => {
          console.log(err)
        }
      )
    } else {
      this.Msg = "Your money is not enough!"
      this.route.navigateByUrl('/cart')
    }
  }

}
