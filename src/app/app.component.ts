import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { global } from './services/global';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'Frontend';
  public identity: any;
  public token: any;
  public url: string;

  constructor( private userService: UserService, private router: Router) {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.url = global.url;
  }


  ngOnInit() {

  }

  ngDoCheck() {
    this.identity = this.userService.getIdentity();
  }

  logout() {
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this.router.navigate(['home']);
  }

  onSubmit( texto: string) {
    this.router.navigate(['/search', texto]);
  }
}
