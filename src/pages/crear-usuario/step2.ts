import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IonicPage, NavController, MenuController, ToastController } from "ionic-angular";
import { NavParams } from "ionic-angular";
import {MyApp} from "../../app/app.component";

@IonicPage({
    name: 'page-step2',
    segment: 'crear-usuario',
    priority: 'high'
})

@Component({
    selector: 'page-step2',
    templateUrl: 'step2.html'
})

export class Step2Page implements OnInit {
    public onRegisterForm: FormGroup;
    email: string;
    displayName:string;

    constructor(private _fb: FormBuilder, public nav: NavController, public menu: MenuController, public navParams: NavParams, public toastCtrl: ToastController) {
      this.menu.swipeEnable(false);
      this.menu.enable(false);
      this.email = navParams.get('email');
      this.displayName = navParams.get('nombres') + " " +navParams.get('apellidos');
    }

    ngOnInit() {
      this.onRegisterForm = this._fb.group({
        password1: ['', Validators.compose([
          Validators.required
        ])],
        password2: ['', Validators.compose([
            Validators.required
        ])]
      });
    }

    // register and go to home page
    step1() {
        this.nav.setRoot('page-register');
    }


    /*
    async crearUsuarioFireBase(passwd1: string, passwd2: string){
      let error = false;
      if (passwd1 == passwd2){
        ionBookingApp.aFAuth.auth.createUserWithEmailAndPassword(this.email, passwd1).catch(function (error) {
          let errorCode = error.code;
          let errorMessage = error.message;
          this.notify("Se presentó el error "+ errorCode + " con el mensaje "+ errorMessage);
          error = true
        });

        if (!error){
          this.nav.setRoot('page-step3')
        }
      }
      else {
        this.notify("Las contraseñas ingresadas no coinciden");
      }
    }
    */

  notify(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top',
      dismissOnPageChange: true,
      cssClass: 'toast-bg'
    });
    toast.present();
  }
  
}
