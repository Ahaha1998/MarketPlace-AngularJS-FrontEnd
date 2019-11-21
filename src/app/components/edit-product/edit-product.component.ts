import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  dataPro: any
  productForm: FormGroup
  image = null
  imgURL: String
  idPro: any

  constructor(
    private fb: FormBuilder, 
    private route: Router, 
    private router: ActivatedRoute, 
    private proSer: ProductService, 
    private locate: Location) { }

  ngOnInit() {
    this.idPro = this.router.snapshot.paramMap.get('id')
    this.proSer.getSingleProduct(this.idPro).subscribe(
      res => {
        this.dataPro = res
        this.imgURL = this.dataPro.photo
        this.createForm()
      }, err => {
        console.log(err)
      })
  }

  createForm() {
    this.productForm = this.fb.group({
      name: [this.dataPro.productName, Validators.required],
      detail: [this.dataPro.detail, Validators.required],
      price: [this.dataPro.price, Validators.required],
      stock: [this.dataPro.stock, Validators.required]
    })
  }

  onFileChanged(event) {
    this.image = event.target.files[0]
  }

  editProduct(name, detail, price, stock) {
    this.proSer.editProduct(this.idPro, name, detail, price, stock).subscribe(
      data => {
        this.uploadPhoto(this.idPro)
      }, err => {
        console.log(err)
      }
    )
  }

  uploadPhoto(id) {
    const uploadData = new FormData();
    uploadData.append('productIMG', this.image, this.image.name);
    this.proSer.uploadProductPhoto(uploadData, id).subscribe(res => {
      this.route.navigate(['/product', this.idPro])
      console.log(res)
    }, err => {
      console.log(err)
    })
  }

  backToPast() {
    this.locate.back()
  }
}
