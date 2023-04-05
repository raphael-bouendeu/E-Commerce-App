import { Order } from './../models/orders';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { APP_CONFIG } from '@store/app-config';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';




@Injectable({ providedIn: 'root' })
export class OrdersService {



  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private appConfig: any) {
  }

  getProductById(productId: string): Observable<any> {
    return this.httpClient.get<any>(this.appConfig.apiUrl + 'products/' + productId);
  }


  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.appConfig.apiUrl + 'orders');
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.httpClient.get<Order>(this.appConfig.apiUrl + 'orders/' + orderId);
  }

  createOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(this.appConfig.apiUrl + 'orders/', order)
  }

  deleteOrder(orderId: string): Observable<object> {
    return this.httpClient.delete<object>(this.appConfig.apiUrl + 'orders/' + orderId)
  }

  updateOrder(orderStatus: { status: number }, orderId: string): Observable<Order> {
    return this.httpClient.put<Order>(this.appConfig.apiUrl + 'orders/' + orderId, orderStatus)
  }
}
