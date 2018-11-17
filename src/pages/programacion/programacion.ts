import { DetailEventPage } from './../detail-event/detail-event';
import { Api2Provider } from './../../providers/api2/api2';
import { AuthProvider } from './../../providers/auth/auth';
import {Component, OnDestroy} from '@angular/core';
import {ToolsService} from "../../providers/tools";
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {Subject} from "rxjs/Subject";
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage({
  name: 'page-programacion',
  segment: 'programacion'
})

@Component({
  selector: 'page-programacion',
  templateUrl: 'programacion.html',
})

export class ProgramacionPage implements OnDestroy {

  events: any;
  path: string;
  url_banner: string;
  nombre_evento: string;
  nombre_usuario: string;
  private unsubscribe = new Subject<void>();

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public tools: ToolsService,
    public menu: MenuController,
    public auth: AuthProvider,
    public api: Api2Provider,
    private socialSharing: SocialSharing
    ) {
    this.menu.swipeEnable(true);
    this.menu.enable(true);
    this.nombre_evento = 'Eventos'
    this.url_banner = 'assets/img/portada.jpg';
    this.nombre_usuario = this.navParams.get("userProfile");
  }

  ionViewDidLoad() {
    this.getEvents();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getEvents(){
    this.api.callPetition('events', 'GET').then(data => {
      this.events = data;
    });
  }

  confirmAssistance(elemento) {
    let userId = localStorage.getItem('userId');
    this.api.callPetition('events/'+ elemento.id + '/assists/' + userId, 'POST')
    .then(data => {
      // Validar si ya se ha registro asistire a ese evento
      this.tools.notify("Se ha agregado el evento "+elemento.nombre+" a la lista Eventos Asistiré.");
      this.nav.setRoot(this.nav.getActive().component);
    });
  }

  registerEvent() {
    this.nav.setRoot('page-register-event');
  }

  detailEvent(elemento) {
    this.nav.push(DetailEventPage, {
      nombre: elemento.nombre,
      sitio_encuentro: elemento.sitio_encuentro,
      fecha: elemento.fecha,
      idEvento: elemento.id
    });
  }

  shareElement(element){
    this.socialSharing.shareViaTwitter(element.nombre, null, null)
              .then(() => {
                console.log("todo ok");
              })
              .catch((error) => {
    });
  }

}
