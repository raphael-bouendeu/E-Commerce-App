import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '@store/app-config';
import { Inject } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class UsersService {

  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private appConfig: any) {
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.appConfig.apiUrl + 'users');
  }

  getUserById(userById: string): Observable<User> {
    return this.httpClient.get<User>(this.appConfig.apiUrl + 'users/' + userById);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.appConfig.apiUrl + 'users/', user)
  }

  deleteUser(userId: string): Observable<object> {
    return this.httpClient.delete<object>(this.appConfig.apiUrl + 'users/' + userId)
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(this.appConfig.apiUrl + 'users/' + user.id, user)
  }

}
