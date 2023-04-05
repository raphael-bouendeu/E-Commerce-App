import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-order-summary',
  templateUrl: './order-summary.component.html',
  styles: [
  ]
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  endSub$: Subject<void> = new Subject();
  totalPrice = 0;
  isCheckout = false;
  constructor(private cartService: CartService, private router: Router,
    private ordersSerice: OrdersService) {
    this.router.url.includes('checkout') ? this.isCheckout = true : this.isCheckout = false
  }

  ngOnInit(): void {
    this.getOrderSummary()
  }
  ngOnDestroy(): void {
    this.endSub$.next()
    this.endSub$.complete()
  }

  getOrderSummary() {
    this.cartService.cart$?.pipe(takeUntil(this.endSub$)).subscribe
      (cart => {
        this.totalPrice = 0;
        if (cart) {
          cart.items?.map(item => {
            this.ordersSerice.getProductById(item.productId as string)
              .pipe(take(1))
              .subscribe(product => {
                if (item.quantity)
                  this.totalPrice += product.price * item.quantity;
              })
          })
        }
      })
  }

  gotoCheckout() {
    this.router.navigate(['/checkout'])
  }
}
