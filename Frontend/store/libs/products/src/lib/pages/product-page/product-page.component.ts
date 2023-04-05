import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductssService } from '../../services/products.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { CartService } from '@store/orders';
import { CartItem } from '../../../../../orders/src/lib/models/cart';

@Component({
  selector: 'ngshop-product-page',
  templateUrl: './product-page.component.html',
  styles: [
  ]
})
export class ProductPageComponent implements OnInit, OnDestroy {

  product!: Product;
  endSub$: Subject<void> = new Subject();
  quantity = 1
  constructor(private productsService: ProductssService, private route: ActivatedRoute
    , private cartService: CartService) { }


  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity
    }
    this.cartService.setCartItem(cartItem)
  }

  ngOnDestroy(): void {
    this.endSub$.next()
    this.endSub$.complete
  }
  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.endSub$)).subscribe(params => {
      if (params['productid']) {
        this.getProduct(params['productid']);
      }
    })
  }

  private getProduct(id: string) {
    this.productsService.getProductById(id).pipe(takeUntil(this.endSub$)).subscribe(
      resProduct => {
        this.product = resProduct;
        console.log(this.product.images)
      }
    )
  }
}
