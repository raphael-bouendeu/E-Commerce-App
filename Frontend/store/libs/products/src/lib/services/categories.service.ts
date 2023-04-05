import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '@store/app-config';
import { Inject } from '@angular/core';




@Injectable({ providedIn: 'root' })
export class CategoriesService {

  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private appConfig: any) {
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.appConfig.apiUrl + 'categories');
  }

  getCategoryById(categoryId: string): Observable<Category> {
    return this.httpClient.get<Category>(this.appConfig.apiUrl + 'categories/' + categoryId);
  }

  createCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.appConfig.apiUrl + 'categories/', category)
  }

  deleteCategory(categoryId: string): Observable<object> {
    return this.httpClient.delete<object>(this.appConfig.apiUrl + 'categories/' + categoryId)
  }

  updateCategory(category: Category): Observable<Category> {
    return this.httpClient.put<Category>(this.appConfig.apiUrl + 'categories/' + category.id, category)
  }
}


