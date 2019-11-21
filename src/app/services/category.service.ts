import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories() {
    return [
      { category: 'Clothes' },
      { category: 'Accessories' },
      { category: 'Food' },
      { category: 'Shoes' },
      { category: 'Book' },
      { category: 'Games' },
      { category: 'Technology' }
    ]
  }
}
