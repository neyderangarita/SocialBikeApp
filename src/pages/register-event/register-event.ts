import { Event } from './../../shared/models/event';
import { Api2Provider } from './../../providers/api2/api2';
import { AuthProvider } from './../../providers/auth/auth';
import {Component} from '@angular/core';
import {ToolsService} from "../../providers/tools";
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@IonicPage({
  name: 'page-register-event',
  segment: 'register-event'
})

@Component({
  selector: 'page-register-event',
  templateUrl: 'register-event.html',
})

export class RegisterEventPage {

  public onRegisterForm: FormGroup;
  public titulo: String;
  event = {} as Event;

  constructor(
    private _fb: FormBuilder,
    public nav: NavController, 
    public navParams: NavParams,
    public tools: ToolsService,
    public menu: MenuController,
    public auth: AuthProvider,
    public api: Api2Provider,
    public http: HttpClient,
    ) {
      this.menu.swipeEnable(true);
      this.menu.enable(true);
      this.titulo = 'Registrar evento'
  }

  ngOnInit() {
    this.onRegisterForm = this._fb.group({
      name: ['', Validators.compose([
        Validators.required
      ])],
      sitio_encuentro: ['', Validators.compose([
        Validators.required
      ])],
      dateEvent: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  ionViewDidLoad() {
  }

  ngOnDestroy() {
  }

  programacion(){
    this.nav.setRoot('page-programacion');
  }

  register(event: Event) {
    let userId = localStorage.getItem('userId');
    let parameter = {
      nombre: event.nombre,
      fecha: event.fecha,
      user_id: userId,
      sitio_encuentro: event.sitio_encuentro
    };
    this.api.callPetition('events/', 'POST', parameter)
    .then(data => {
      this.nav.setRoot('page-programacion');
      this.tools.notify("Se ha registrado el evento: " + parameter.nombre + " correctamente.");
    });
  }

}
