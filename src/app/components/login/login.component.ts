import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User;
  public identity: any;
  public status: string;
  public token: string;

  constructor(
    private userService: UserService,
    private router: Router
    ) {

    this.user = new User('', '', '', '', '', '', 'ROLE_USER');
  }

  ngOnInit() {
  }


  onSubmit(form: any) {
    this.userService.login(this.user).subscribe((data: any) => {
      if (data.userEncontrado && data.userEncontrado._id) {
        // Guardamos al usuario en una propiedad
        this.identity = data.userEncontrado;
        // Guardamos la info del usuario en el local storage
        localStorage.setItem('identity', JSON.stringify(this.identity));

        // Conseguir el token del usuario
        this.userService.login(this.user, true).subscribe((responseToken: any) => {
          if (responseToken.token) {
            // Guardamos el token
            this.token = responseToken.token;
            // Guardamos el tokem del usuario en el local storage
            localStorage.setItem('token', this.token);
            this.status = 'success';
            this.router.navigate(['/home']);

          } else {
            this.status = 'error';
          }

        }, (error) => {
            this.status = 'error';
            console.log(error);
        });

      } else {
        this.status = 'error';
      }
    }, (error) => {
        console.log(error);
    });
  }
}
