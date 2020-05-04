import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class NoIdentityGuard implements CanActivate {

  public identity: any;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.identity = this.userService.getIdentity();
  }

  // Los que esten identificados no podran entrar a login ni a register
  canActivate() {

    if (this.identity && this.identity.name) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }

  }
}
