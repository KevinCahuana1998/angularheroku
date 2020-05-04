import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: any[];
  public url: string;

  constructor(
    private userService: UserService
  ) {
    this.url = global.url;
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe( (data: any) => {
      if (data.users) {
        this.users = data.users;
      } else {
        console.log('error, no hay users');
      }
    }, (error) => {
      console.log('no trajo los users' + error);
    });
  }

}
