import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import AngularFireAuth for Firebase authentication
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private afAuth: AngularFireAuth) { }

  // Check if the user is logged in
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise<boolean>((resolve) => {
      this.afAuth.authState.subscribe((user) => {
        if (!user) {
          this.router.navigate(["/"]);
        }
        resolve(true); // Return true if the user is logged in
      });
    });
  }
}
