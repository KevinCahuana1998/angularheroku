import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { identity } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;
  public identity: any;
  public token: string;

  constructor(private http: HttpClient) {
    this.url = global.url;
  }

  register(user: any) {
    const userJson = JSON.stringify(user);

    const header = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(this.url + 'register', userJson, {headers: header});
  }

  login(user: any, getToken = false) {
    user.getToken = getToken;
    const userJson = JSON.stringify(user);
    const header = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(this.url + 'login', userJson, {headers: header});
  }

  getIdentity() {
    const identitys = JSON.parse(localStorage.getItem('identity'));
    if ( identitys && identitys != null && identitys !== undefined && identitys !== 'undefined') {
      this.identity = identitys;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    const tokeN = localStorage.getItem('token');
    if ( tokeN && tokeN != null && tokeN !== undefined && tokeN !== 'undefined') {
      this.token = tokeN;
    } else {
      this.token = null;
    }
    return this.token;
  }

  update(user: any) {
    const userJson = JSON.stringify(user);

    const header = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', this.getToken());

    return this.http.put(this.url + 'update', userJson, {headers: header});

  }
}

