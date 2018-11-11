import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, DebugElement } from '@angular/core';

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

  callPetition(ruta: string, metodo: string){
    return this.http.get<any[]>(ruta, this.httpOptions);
  }

  setToken(token: string){
    this.token = token;
  }

}
