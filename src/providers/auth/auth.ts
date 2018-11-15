import { Api2Provider } from './../api2/api2';
import { User } from './../../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

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
    console.log('Hello AuthProvider Provider');
  }

  login(user: User){
    return this.http.post<any>(api + "auth/login", user, httpOptions).pipe(
      tap((retorno: any) => {

        this.token = retorno.auth_token;
        this.userId = retorno.user[0].id;
        localStorage.setItem('token', this.token);
        localStorage.setItem('userId', this.userId);
        
      }));
  }
}
