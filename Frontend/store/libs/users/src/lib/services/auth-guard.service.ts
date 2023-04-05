import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  constructor(private router: Router,
    private localstorageService: LocalstorageService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = this.localstorageService.getToken()
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]))
      if (tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)) {
        return true
      }
      this.router.navigateByUrl('/login')
      return false;
    }
    this.router.navigateByUrl('/login')
    return false;
  }
  private _tokenExpired(expiration: any): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration
  }

}
