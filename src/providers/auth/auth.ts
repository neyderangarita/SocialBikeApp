import { Api2Provider } from './../api2/api2';
import { User } from './../../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const api = 'https://socialbike.herokuapp.com/';

@Injectable()
export class AuthProvider {
  
  token;
  Api2Provider: any;

  constructor(public http: HttpClient, public api: Api2Provider) {
    console.log('Hello AuthProvider Provider');
  }

  login(user: User){
    return this.http.post<any>(api + "auth/login", user, httpOptions).pipe(
      tap((token: any) => {
        this.token = token.auth_token;
        localStorage.setItem('token', this.token);
      }));
    }
}
