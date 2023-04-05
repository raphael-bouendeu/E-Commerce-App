import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { APP_CONFIG } from '@store/app-config';
import { Inject } from '@angular/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private localstorageService: LocalstorageService, @Inject(APP_CONFIG) private appConfig: any) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localstorageService.getToken()
    const isAPIurl = request.url.startsWith(this.appConfig.apiUrl)
    if (token && isAPIurl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
