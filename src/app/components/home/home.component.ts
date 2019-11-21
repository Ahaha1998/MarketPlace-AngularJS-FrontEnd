import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataPro: any
  search: any = { productName: '' }
  searchBar: FormGroup

  constructor(private fb: FormBuilder, private productSer: ProductService, private route: Router) { }

  ngOnInit() {
    this.productSer.getProduct().subscribe(
      res => {
        this.dataPro = this.shuffle(res)
      }, err => {
        console.log(err)
      }
    )
    this.searchBar = this.fb.group({
      searchIn: [this.search, Validators.maxLength(0)]
    })
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

}
