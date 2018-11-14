import { DetailEventPage } from './../detail-event/detail-event';
import { Event } from './../../shared/models/event';
import { Api2Provider } from './../../providers/api2/api2';
import { AuthProvider } from './../../providers/auth/auth';
import {Component, OnDestroy} from '@angular/core';
import {ToolsService} from "../../providers/tools";
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

  misEvents: any;
  path: string;
  url_banner: string;
  nombre_evento: string;
  private unsubscribe = new Subject<void>();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public tools: ToolsService,
    public menu: MenuController,
    public auth: AuthProvider,
    public api: Api2Provider,
    ) {
      this.menu.swipeEnable(true);
      this.menu.enable(true);
      this.nombre_evento = 'Mis eventos creados'
      this.url_banner = 'assets/img/portada.jpg';
  }

  ionViewDidLoad() {
    this.getMisEvents();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getMisEvents(){
    let userId = localStorage.getItem('userId');
    this.api.callPetition('events/' + userId, 'GET')
    .then(data => {
      this.misEvents = data;
    });
  }

  confirmAssistance(elemento) {
    let userId = localStorage.getItem('userId');
    this.api.callPetition('events/'+ elemento.id + '/assists/' + userId, 'POST')
    .then(data => {
      // Validar si ya se ha registro asistire a ese evento
      this.tools.notify("Se ha agregado el evento "+elemento.nombre+" a la lista Eventos Asistiré.");
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    });
  }

  detailEvent(elemento) {
    this.navCtrl.push(DetailEventPage, {
      nombre: elemento.nombre,
      sitio_encuentro: elemento.sitio_encuentro,
      fecha: elemento.fecha,
      idEvento: elemento.id
    });
  }

}
