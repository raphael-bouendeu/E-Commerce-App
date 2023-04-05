import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemDetailed, CartItem } from '../../models/cart';
import { CartService } from '../../services/cart.service';

import { OrdersService } from '../../services/orders.service';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit, OnDestroy {
  endSub$: Subject<void> = new Subject();
  cartItemsDetailed: CartItemDetailed[] = []
  cartCount = 0;
  quantity = 1;
  constructor(private route: Router, private orderService: OrdersService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartDetails()
  }

  updateCartItemQuantity(event: any, cartItem: CartItemDetailed) {
    this.cartService.setCartItem({
      productId: cartItem.product.id,
      quantity: event.value
    }, true)

  }

  ngOnDestroy(): void {
    this.endSub$.next()
    this.endSub$.complete()
  }

  getTotalPrice(cartItem: CartItemDetailed) {
    return cartItem.product.price * cartItem.quantity;
  }

  backToShop() {
    this.route.navigateByUrl('/products')
  }
  deleteCartItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id)

  }
  private getCartDetails() {
    this.cartService.cart$?.pipe(takeUntil(this.endSub$)).subscribe(respCart => {
      this.cartItemsDetailed = []
      this.cartCount = respCart.items?.length ?? 0;
      respCart.items?.forEach(cartIem => {
        this.orderService.getProductById(cartIem.productId as string).pipe().subscribe(
          respProduct => {
            this.cartItemsDetailed.push({
              product: respProduct,
              quantity: cartIem.quantity ?? 1
            })
          }
        )
      })
    })
  }
}
