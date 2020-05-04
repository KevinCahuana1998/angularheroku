import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  public identity: any;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.identity = this.userService.getIdentity();
  }

  // Los que no estan identificados no podran entrar a panel ni a sus rutas hijas
  // Tampoco a ajustes

  canActivate() {

    if (this.identity && this.identity.name) {

      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }

  }

}
