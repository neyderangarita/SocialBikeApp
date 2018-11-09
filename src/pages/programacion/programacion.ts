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

  evento: string;
  path: string;
  url_banner: string;
  nombre_evento: string;
  private unsubscribe = new Subject<void>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController
    ) {
    this.menu.swipeEnable(true);
    this.menu.enable(true);
    this.evento = 'none';
    this.nombre_evento = 'Evento inicial'
    this.url_banner

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgramacionPage');
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
