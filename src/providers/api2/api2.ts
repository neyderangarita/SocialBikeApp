import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const api = 'https://socialbike.herokuapp.com/';

@Injectable()
export class Api2Provider {
  token;
  httpOptions;

  constructor(public http: HttpClient) {
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`                 
        })
    };
  }

  callPetition(recurso: string, requestMethod: string, parameter?: {}){

    if(!this.token){
      this.token = localStorage.getItem('token');

      this.httpOptions = {
        headers: new HttpHeaders(
          { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`                 
          })
      };
      
    }
    
    if (requestMethod === 'GET'){
      return new Promise(resolve => {
        this.http.get(api + recurso, this.httpOptions).subscribe(data => {
          resolve(data);
        }, err => {
          console.log("Falló");
          console.log(err);
        });
      });
    }
    else if (requestMethod === 'POST'){
      return new Promise(resolve => {
        this.http.post(api + recurso, parameter, this.httpOptions).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
    }
    else{
      return new Promise(resolve => {
        this.http.delete(api + recurso, this.httpOptions).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
    }
  }

  setToken(token: string){
    this.token = token;
  }

}
