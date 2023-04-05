import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@store/users';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { Cart } from '../../models/cart';
import *  as countriesList from 'i18n-iso-countries';
import { Order } from '../../models/orders';
import { OrderItems } from '../../models/orders-item copy';

declare const require: (arg0: string) => countriesList.LocaleData;

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService
  ) { }
  checkoutFormGroup!: FormGroup;
  isSubmitted = false;
  orderItems!: OrderItems[];
  userId = '641ce2b03cd018957e575dfc';
  countries: any[] = [];

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCartItems();
    this.getCountries();
  }

  private getCountries() {
    countriesList.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries = Object.entries(countriesList.getNames("en", { select: "official" })).map(entry => {
      return {
        id: entry[0],
        name: entry[1]
      }
    })
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items?.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity
      };
    }) as OrderItems[];
  }


  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm['street'].value,
      shippingAddress2: this.checkoutForm['apartment'].value,
      city: this.checkoutForm['city'].value,
      zip: this.checkoutForm['zip'].value,
      country: this.checkoutForm['country'].value,
      phone: this.checkoutForm['phone'].value,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`
    };

    this.ordersService.createOrder(order).subscribe(
      () => {
        //redirect to thank you page // payment
        this.cartService.emptyCart();
        this.router.navigate(['/success']);

      },
      () => {
        //display some message to user
      }
    );
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}

