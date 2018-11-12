import { AuthProvider } from './../auth/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, DebugElement } from '@angular/core';

const api = 'https://socialbike.herokuapp.com/';

@Injectable()
export class Api2Provider {
  token;
  httpOptions;

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`                 
        })
    };
  }

  callPetition(recurso: string, requestMethod: string){

    if (requestMethod === 'GET'){

      return new Promise(resolve => {
        this.http.get(api + recurso, this.httpOptions).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });

    }
    else{

      /*
      return this.http.post<any>(api + "auth/login", user, httpOptions).pipe(
        tap((token: any) => {
          this.token = token.auth_token;
          localStorage.setItem('token', this.token);
        }));
      }
      */

    }


  }

  setToken(token: string){
    this.token = token;
  }

}
