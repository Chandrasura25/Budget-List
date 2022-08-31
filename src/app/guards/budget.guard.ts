import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetGuard implements CanActivate {
  constructor(public router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user=JSON.parse(localStorage.getItem('current_user') !)
      console.log(user);
      if(!user){
        this.router.navigate(['/signin'])
      }
    return true;
  }
  
}
