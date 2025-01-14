import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersAuthGuard implements CanActivate {
   constructor(private router: Router) {}
  
    canActivate(): boolean {
      const token = localStorage.getItem('authToken');
      const roles = JSON.parse(localStorage.getItem('roles') || '[]');
      if (token) {
        if(roles.includes('Admin')) 
          return true; 
        else {
          this.router.navigate(['/forbidden']); // Redirect to forbidden if no Admin Role
          return false ; 
        }

      }
      this.router.navigate(['/login']); // Redirect to login if no token
      return false;
    }
  
}
