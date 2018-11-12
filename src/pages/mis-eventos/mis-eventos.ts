import { Event } from './../../shared/models/event';
import { Api2Provider } from './../../providers/api2/api2';
import { HttpClient } from '@angular/common/http';
import { AuthProvider } from './../../providers/auth/auth';
import {Component, OnDestroy} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {Subject} from "rxjs/Subject";

@IonicPage({
  name: 'page-mis-eventos',
  segment: 'mis-eventos'
})

@Component({
  selector: 'page-mis-eventos',
  templateUrl: 'mis-eventos.html',
})


export class MisEventosPage {

  events: any;
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
      this.nombre_evento = 'Mis eventos'
      this.url_banner
  }

  ionViewDidLoad() {
    this.getMisEvents();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getMisEvents(){
    this.api.callPetition('events', 'GET')
    .then(data => {
      this.events = data;
      console.log(this.events);
    });
  }

}
