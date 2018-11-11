import { Api2Provider } from './../../providers/api2/api2';
import { HttpClient } from '@angular/common/http';
import { AuthProvider } from './../../providers/auth/auth';
import {Component, OnDestroy} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {MyApp} from "../../app/app.component";
import {Subject} from "rxjs/Subject"

/**
 * Generated class for the ProgramacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  name: 'page-programacion',
  segment: 'programacion'
})

@Component({
  selector: 'page-programacion',
  templateUrl: 'programacion.html',
})

export class ProgramacionPage implements OnDestroy {

  events: any[];
  path: string;
  url_banner: string;
  nombre_evento: string;
  private unsubscribe = new Subject<void>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public auth: AuthProvider,
    public api: Api2Provider,
    ) {
    this.menu.swipeEnable(true);
    this.menu.enable(true);
    this.nombre_evento = 'Evento inicial'
    this.url_banner
  }

  ionViewDidLoad() {
    this.getEvents();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getEvents(){

    const api = 'https://socialbike.herokuapp.com/';
    let token = this.auth.token;
    let ruta = api + 'events'
    
    this.api.callPetition(ruta, 'get').subscribe(
      (data) => { // Success
        console.log(data);
      },
      (error) =>{
        console.error(error);
      }

    ) 

  }

}
