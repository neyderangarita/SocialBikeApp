import { Api2Provider } from './../../providers/api2/api2';
import { AuthProvider } from './../../providers/auth/auth';
import {Component} from '@angular/core';
import {ToolsService} from "../../providers/tools";
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {Subject} from "rxjs/Subject";
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage({
  name: 'page-asistire',
  segment: 'asistire'
})

@Component({
  selector: 'page-asistire',
  templateUrl: 'asistire.html',
})

export class AsistirePage {

  eventsAssist: any;
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
    private socialSharing: SocialSharing
    ) {
    this.menu.swipeEnable(true);
    this.menu.enable(true);
    this.nombre_evento = 'Eventos a los que Asistiré'
    this.url_banner = 'assets/img/portada.jpg';
  }

  ionViewDidLoad() {
    this.getEventsAssist();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getEventsAssist(){

    let userId = localStorage.getItem('userId');
    this.api.callPetition('events/assists/' + userId, 'GET')
    .then(data => {
      this.eventsAssist = data;
    });
    
  }

  cancelAssist(elemento) {
    this.api.callPetition('events/'+ elemento.id + '/assists/' + elemento.user_id, 'DELETE')
    .then(data => {
      // Validar si ya se ha registro asistire a ese evento
      this.tools.notify("Se ha cancelado el registro al evento correctamente");
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    });
  }

  shareElement(element){
    this.socialSharing.shareViaTwitter( "Te invitamos a: " + element.nombre + "en el sitio de encuentro: " + element.sitio_encuentro + " el día: " + element.fecha, null, null)
              .then(() => {
                console.log("todo ok");
              })
              .catch((error) => {
    });
  }
}
