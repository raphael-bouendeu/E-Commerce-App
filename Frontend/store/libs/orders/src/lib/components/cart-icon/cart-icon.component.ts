import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'orders-cart-icon',
  templateUrl: './cart-icon.component.html',
  styles: [
  ]
})
export class CartIconComponent implements OnInit {

  cartCount!: any;
  constructor(private cartserice: CartService) { }

  ngOnInit(): void {
    this.cartserice.cart$?.subscribe(cart => {
      this.cartCount = this.cartserice.getCart().items?.length;
    })

  }

}
