import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup
  categoryList: any
  image = null
  imgURL: String
  category: string
  Proda: any

  constructor(private fb: FormBuilder, private route: Router, private proSer: ProductService, private cateSer: CategoryService) {}

  createForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      detail: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required]
    })
    this.categoryList = this.cateSer.getCategories()
  }

  ngOnInit() {
    this.createForm()
  }

  onFileChanged(event) {
    this.image = event.target.files[0]
  }

  addProduct(name, detail, price, stock) {
    this.proSer.addProduct(name, detail, this.category, price, stock).subscribe(
      data => {
        this.Proda = data
        this.uploadPhoto(this.Proda._id)
      }, err => {
        console.log(err)
      }
    )
  }

  uploadPhoto(id) {
    const uploadData = new FormData();
    uploadData.append('productIMG', this.image, this.image.name);
    this.proSer.uploadProductPhoto(uploadData, id).subscribe(res => {
      console.log(res)
      this.route.navigateByUrl('/')
    }, err => {
      console.log(err)
    })
  }

  getValue(event: any) {
    this.category = event.target.value
    console.log(this.category)
  }

}
