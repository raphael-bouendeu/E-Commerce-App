import { Component, Input } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CartItem, CartService } from '@store/orders';
import { Product } from '../../models/product';


@Component({
  selector: 'ngshop-product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent {
  @Input() product!: Product

  constructor(private cartService: CartService) { }


  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1
    }
    this.cartService.setCartItem(cartItem)

  }
}
