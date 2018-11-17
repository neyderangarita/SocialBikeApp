import { Api2Provider } from './../api2/api2';
import { User } from './../../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const api = 'https://socialbike.herokuapp.com/';

@Injectable()
export class AuthProvider {
  token;
  userId;
  Api2Provider: any;
  constructor(public http: HttpClient, public api: Api2Provider) {
  }

  login(user: User) {
    return new Promise((resolve) =>{
      this.http.post<any>(api + "auth/login", user, httpOptions).subscribe((retorno: any) => {
          this.token = retorno.auth_token;
          this.userId = retorno.user[0].id;
          localStorage.setItem('token', this.token);
          localStorage.setItem('userId', this.userId);
          localStorage.setItem('usuario', retorno.user[0].username);
          resolve();
      });
    });
  }

}
