import { ProgramacionPage } from './../programacion/programacion';
import { Api2Provider } from './../../providers/api2/api2';
import { AuthProvider } from './../../providers/auth/auth';
import {Component} from '@angular/core';
import {ToolsService} from "../../providers/tools";
import {IonicPage, MenuController, NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import {Subject} from "rxjs/Subject";
//import {SocialSharing} from "@ionic-native/social-sharing";

@IonicPage({
  name: 'page-detail-event',
  segment: 'detail-event'
})

@Component({
  selector: 'page-detail-event',
  templateUrl: 'detail-event.html',
})


export class DetailEventPage {

  comments: any;
  path: string;
  url_banner: string;
  nombre_evento: string;
  private unsubscribe = new Subject<void>();
  
  public nombre: string;
  public sitio_encuentro: string;
  public fecha: string;
  public idEvento: string;
  message: string;

  constructor(
    public navCtrl: NavController,
    public nav: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public tools: ToolsService,
    public menu: MenuController,
    public auth: AuthProvider,
    public api: Api2Provider,
    public toastCtrl: ToastController,
  ) {
    this.menu.swipeEnable(true);
    this.menu.enable(true);
    this.nombre_evento = 'Detalle evento'
    this.url_banner = 'assets/img/portada.jpg';
    this.nombre = this.navParams.get('nombre');
    this.sitio_encuentro = this.navParams.get("sitio_encuentro");
    this.fecha = this.navParams.get("fecha");
    this.idEvento = this.navParams.get("idEvento");
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad DetailEventPage');
    this.getComments();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getComments(){
    this.api.callPetition('events/' + this.idEvento + '/comments/', 'GET')
    .then(data => {
      this.comments = data;
    });
  }

  sendComment(){

    let forgot = this.alertCtrl.create({
      title: 'Registrar comentario',
      message: " ",
      inputs: [
        {
          name: 'comment',
          placeholder: 'Comentario',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            if(data.comment != ''){
              let userId = localStorage.getItem('userId');
              let parameter = {
                user_id: userId,
                comment: data.comment
              };
              this.api.callPetition('events/' + this.idEvento + '/comments/', 'POST', parameter)
              .then(data => {
                this.getComments();
              });
            }

            let toast = this.toastCtrl.create({
              message: 'Se ha registrado un comentario correctamente',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();        
          }
        }
      ]
    });  
    forgot.present();
  }

}
