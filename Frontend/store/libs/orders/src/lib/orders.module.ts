import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ordersRoutes } from './lib.routes';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';

@NgModule({
  imports: [CommonModule, DropdownModule, InputMaskModule, ReactiveFormsModule, InputNumberModule, FormsModule,
    ButtonModule, RouterModule.forChild(ordersRoutes), BadgeModule],
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent
  ],
  exports: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    ThankYouComponent
  ],
})
export class OrdersModule {
  constructor(private cartService: CartService) {
    this.cartService.initCartLocalStorage()
  }
}
