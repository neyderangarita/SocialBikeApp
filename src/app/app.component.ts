import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';
import {Storage} from "@ionic/storage";


export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = "page-login";
  showMenu: boolean = true;
  appMenuItems: Array<MenuItem>;
  public static usuario;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    public storage: Storage,
  ) {

    this.initializeApp();

    this.appMenuItems = [
      //Todos los eventos creados
      {title: 'Eventos', component: 'page-programacion', icon: 'calendar'},
      //Eventos creados por mi
      {title: 'Eventos Programados por mi', component: 'page-evento-programado', icon: 'grid'},
      //Eventos a los que asistiré
      {title: 'Eventos Asistiré', component: 'page-evento-paralelo', icon: 'grid'}

      //{title: 'Mi Itinerario', component: 'page-mi-itinerario', icon: 'heart'},
      //{title: 'Reservar Salas', component: 'page-reservar-sala', icon: 'clock'},
      //{title: 'Mis Reservas', component: 'page-consultar-reserva-salas', icon: 'list-box'},
      //{title: 'Información General', component: 'page-informacion-general', icon: 'information-circle'},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      //*** Control Keyboard
      this.keyboard.hide();
      MyApp.getUser();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    
  }

  logout() {
    this.nav.setRoot('page-login');

  }

  public static getUser() {
  }

}

