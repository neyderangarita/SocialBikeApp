import {Component} from '@angular/core';
import {ToolsService} from "../../providers/tools";
import {Loading, LoadingController, IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {Subject} from "rxjs/Subject";
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@IonicPage({
  name: 'page-tips',
  segment: 'tips',
})

@Component({
  selector: 'page-tips',
  templateUrl: 'tips.html',
})
export class TipsPage {

  url_banner: string;
  nombre_evento: string;
  private unsubscribe = new Subject<void>();
  trustedVideoUrl: Array<SafeResourceUrl>;
  loading: Loading;


  videos: any[] = [
                    {
                      title: 'Cómo ajustar la altura del sillín de bicicleta',
                      video: 'https://www.youtube.com/embed/GskchTF3Z5Q',
                    },
                    {
                      title: 'Cómo limpiar la transmisión de la bicicleta. Mantenimiento',
                      video: 'https://www.youtube.com/embed/-dFZYnwzUqE',
                    },
                    {
                      title: 'Como cambiar y reparar una cadena de bicicleta',
                      video: 'https://www.youtube.com/embed/6Gf3hjWgLWM',
                    },
                    {
                      title: 'Montar y desmontar la rueda trasera de tu bicicleta, trucos y consejos',
                      video: 'https://www.youtube.com/embed/krKASZdxo48',
                    },
                    {
                      title: 'Como ajustar un freno "V" de bicicleta',
                      video: 'https://www.youtube.com/embed/cYkyFTdVy2Q',
                    },
                    {
                      title: 'Solucionar avería de salto de cadena en piñones de bicicletao',
                      video: 'https://www.youtube.com/embed/Bvxj9hlSRCk',
                    },
                    {
                      title: 'Qué importancia tienen los tapones del manillar de una bicicleta',
                      video: 'https://www.youtube.com/embed/6Xwgz1MNKtg',
                    }
                  ];

  video: any = {
    url: 'https://www.youtube.com/embed/MLleDRkSuvk',
    title: 'Awesome video'
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public tools: ToolsService,
    public menu: MenuController,
    private domSanitizer: DomSanitizer,
    public loadingCtrl: LoadingController,
    ) {
      this.menu.swipeEnable(true);
      this.menu.enable(true);
      this.nombre_evento = 'Tips para Bici'
    }

  ionViewDidLoad() {
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ionViewWillEnter(): void {

    this.trustedVideoUrl = new Array<SafeResourceUrl>();

    for (let index = 0; index < this.videos.length; index++) {
      this.trustedVideoUrl.push(this.domSanitizer.bypassSecurityTrustResourceUrl(this.videos[index].video));
    }
  }

  handleIFrameLoadEvent(): void {
  }

}
