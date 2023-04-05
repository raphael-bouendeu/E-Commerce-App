import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '@store/app-config';
import { Inject } from '@angular/core';
import { Product } from '../models/product';





@Injectable({ providedIn: 'root' })
export class ProductssService {

  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private appConfig: any) {
  }

  getProducts(selectedCategories?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if (selectedCategories) {
      params = params.append('categories', selectedCategories.join(','))
    }
    return this.httpClient.get<Product[]>(this.appConfig.apiUrl + 'products', { params: params });
  }

  getProductById(productId: string): Observable<Product> {
    return this.httpClient.get<Product>(this.appConfig.apiUrl + 'products/' + productId);
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.httpClient.post<Product>(this.appConfig.apiUrl + 'products/', productData)
  }

  deleteProduct(productId: string): Observable<object> {
    return this.httpClient.delete<object>(this.appConfig.apiUrl + 'products/' + productId)
  }

  getFeaturedProducts(count: number): Observable<any> {
    return this.httpClient.get<any>(this.appConfig.apiUrl + 'products/get/featured/' + count);
  }

  updateProduct(productData: FormData, productId: string): Observable<Product> {
    return this.httpClient.put<Product>(this.appConfig.apiUrl + 'products/' + productId, productData)
  }
}


