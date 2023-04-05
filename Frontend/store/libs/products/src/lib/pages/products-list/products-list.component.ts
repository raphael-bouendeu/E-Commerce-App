import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductssService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngshop-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit, OnDestroy {

  products!: Product[]
  categories!: Category[]
  endSub$: Subject<void> = new Subject();
  isCategoryPage = false

  constructor(private productsService: ProductssService,
    private categoriesService: CategoriesService, private route: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.endSub$.next()
    this.endSub$.complete
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params['categoryid'] ? this._getProducts([params['categoryid']]) : this._getProducts()
      params['categoryid'] ? this.isCategoryPage = true : this.isCategoryPage = false;
    })

    this._getCategories()
  }
  _getProducts(selectedCategories?: string[]) {
    this.productsService.getProducts(selectedCategories).pipe(takeUntil(this.endSub$)).subscribe(
      data => {
        this.products = data
      }
    )
  }
  _getCategories() {
    this.categoriesService.getCategories().pipe(takeUntil(this.endSub$)).
      subscribe(data => {
        this.categories = data;
      })
  }

  categoryFilter() {
    const selectedCategories = this.categories.filter(category => category.checked).map((category: Category) => {
      if (category.id) {
        const id: string = category.id
        return id;
      }
      return '';
    })
    this._getProducts(selectedCategories)
  }
}
