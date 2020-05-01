import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: User;
  public status: string;

  constructor( private userService: UserService) {

    this.user = new User('', '', '', '', '', '', 'ROLE_USER');
   }

  ngOnInit() {
  }

  onSubmit(form: any) {
    this.userService.register(this.user).subscribe((data: any) => {
      if (data.user && data.user._id) {
        this.status = 'success';
        form.reset();
      } else {
        this.status = 'error';
      }
    }, (error) => {
      console.log(error);
    });
  }

}
