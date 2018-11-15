import { DetailEventPage } from './../detail-event/detail-event';
import { Api2Provider } from './../../providers/api2/api2';
import { AuthProvider } from './../../providers/auth/auth';
import {Component} from '@angular/core';
import {ToolsService} from "../../providers/tools";
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {Subject} from "rxjs/Subject";
import {InAppBrowser} from "@ionic-native/in-app-browser";

@IonicPage({
  name: 'page-alarma',
  segment: 'alarma',
})

@Component({
  selector: 'page-alarma',
  templateUrl: 'alarma.html',
})

export class AlarmaPage {

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
      this.nombre_evento = 'Alarma de robos'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlarmaPage');
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  openURL(url: string){
    let browser = new InAppBrowser();
    browser.create(url, '_system');
  }


}
