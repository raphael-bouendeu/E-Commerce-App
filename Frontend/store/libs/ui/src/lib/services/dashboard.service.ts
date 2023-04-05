import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '@store/app-config';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private appConfig: any) { }

  getProductsCount(): Observable<{ productCount: number }> {
    return this.httpClient.get<{ productCount: number }>(this.appConfig.apiUrl + 'products/get/count');
  }

  getUsersCount(): Observable<{ userCount: number }> {
    return this.httpClient.get<{ userCount: number }>(this.appConfig.apiUrl + 'users/get/count');
  }
  getOrdersCount(): Observable<{ orderCount: number }> {
    return this.httpClient.get<{ orderCount: number }>(this.appConfig.apiUrl + 'orders/get/count');
  }
  getTotalSales(): Observable<{ totalsales: number }> {
    return this.httpClient.get<{ totalsales: number }>(this.appConfig.apiUrl + 'orders/get/totalsales');
  }
}
