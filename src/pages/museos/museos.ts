import {Component} from '@angular/core';
import {ToolsService} from "../../providers/tools";
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import * as $ from "jquery";

@IonicPage({
  name: 'page-museos',
  segment: 'museos'
})

@Component({
  selector: 'page-museos',
  templateUrl: 'museos.html',
})

export class MuseosPage {

  public titulo: String;
  museos: any;
  url_banner: string;

  constructor(
    public nav: NavController, 
    public navParams: NavParams,
    public tools: ToolsService,
    public menu: MenuController,
    public http: HttpClient,
    ) {
      this.menu.swipeEnable(true);
      this.menu.enable(true);
      this.titulo = 'Museos de Bogotá';
      this.url_banner = 'assets/img/museos.jpg';
  }

  ngOnInit() {  
    this.http.get('https://www.datos.gov.co/resource/mdh3-rurf.json?$limit=5000&$$app_token=ouTTrX3lpEoGoHMBdif2oGh64').subscribe(data => {
      console.log(data);
      this.museos = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MuseosPage');
  }

  ngOnDestroy() {
  }

}
