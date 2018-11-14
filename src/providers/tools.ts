import {Injectable} from '@angular/core';
import {ToastController} from "ionic-angular";
//import {SocialSharing} from "@ionic-native/social-sharing";

@Injectable()
export class ToolsService {

  constructor(
    public toastCtrl: ToastController,
    //private socialSharing: SocialSharing
    ) {
  }

  encodeUserEmail(email: string) {
    let re = /\./gi;
    return email.replace(re, ",");
  }

  decodeUserEmail(email: string) {
    let re = /\,/gi;
    return email.replace(re, ".");
  }

  notify(msg, duration?:number) {
    let time = 3000;
    if (duration != undefined){
      time = duration;
    }
    let toast = this.toastCtrl.create({
      message: msg,
      duration: time,
      position: 'top',
      dismissOnPageChange: true,
      showCloseButton: true,
      closeButtonText: 'Cerrar',
      cssClass: 'toast-bg'
    });
    toast.present();
  }

  share(msg){
    /*
    this.socialSharing.share(msg, null, null, null).then(() =>{
      console.log("todo ok");
    }).catch(error => {
      console.log(error.message);
    });
    */
  }
  
}
