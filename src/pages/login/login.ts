import { AuthProvider } from './../../providers/auth/auth';
import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, IonicPage, MenuController, NavController, ToastController} from "ionic-angular";
import {User} from "../../shared/models/user";
import {MyApp} from "../../app/app.component";
import {Storage} from "@ionic/storage";
import { LoadingController } from 'ionic-angular';

@IonicPage({
  name: 'page-login',
  segment: 'login',
  priority: 'high'
})

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;
  user = {} as User;
  data: any;
  loading: any;

  constructor(
    private _fb: FormBuilder,
    public nav: NavController,
    public forgotCtrl: AlertController,
    public menu: MenuController,
    public toastCtrl: ToastController,
    public storage: Storage,
    public auth: AuthProvider, 
    private loadingCtrl: LoadingController
  )
  {
    this.menu.swipeEnable(false);
    this.menu.enable(false);
    MyApp.getUser();
    this.loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
  }

  ngOnInit() {
    this.onLoginForm = this._fb.group({
      username: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  // go to register page
  register() {
    this.nav.setRoot('page-register');
  }

  // login and go to home page
  login(user: User) {
    this.auth.login(user).then( retorno => {
        this.loading.present();
        this.goBack();
    });
  }

  goBack(){
    this.nav.setRoot('page-programacion', {userProfile: ""} );
    this.loading.dismiss();
    document.getElementById('nombres').innerHTML = localStorage.getItem('usuario');
  }

  forgotPass() {

    let forgot = this.forgotCtrl.create({
      title: '¿Olvidaste tu contraseña?',
      message: "Ingresa tu email registrado, para enviarte un correo de recuperación.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
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

            let toast = this.toastCtrl.create({
              message: 'Se ha enviado un enlace de recuperación a tu email',
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
