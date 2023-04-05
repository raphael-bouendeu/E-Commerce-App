import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../models/product';
import { ProductssService } from '../../services/products.service';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'ngshop-featured-product',
  templateUrl: './featured-products.component.html',
  styles: [
  ]
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {


  endSub$: Subject<void> = new Subject();
  featuredproducts!: Product[]
  constructor(private productsService: ProductssService) { }
  ngOnDestroy(): void {
    this.endSub$.next()
    this.endSub$.complete
  }

  ngOnInit(): void {
    this.getFeaturedProducts()
  }

  getFeaturedProducts() {
    this.productsService.getFeaturedProducts(4).pipe(takeUntil(this.endSub$)).subscribe
      ((data) => {
        this.featuredproducts = data.products
      })
  }
}
