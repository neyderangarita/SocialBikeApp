import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  callPetition(ruta: string, metodo: string){
    return this.http.get<any[]>(ruta, httpOptions);
  }

}
