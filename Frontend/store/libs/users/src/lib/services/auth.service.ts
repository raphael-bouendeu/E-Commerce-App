import { Inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '@store/app-config';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',

})
export class AuthService {

  constructor(private http: HttpClient, private router: Router,
    private localstorageService: LocalstorageService,
    @Inject(APP_CONFIG) private appConfig: any) { }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.appConfig.apiUrl + 'users/login', { email, password });
  }

  logout() {
    this.localstorageService.removeToken()
    this.router.navigateByUrl('/login')
  }

}
