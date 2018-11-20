import { Event } from './../../shared/models/event';
import { Api2Provider } from './../../providers/api2/api2';
import { AuthProvider } from './../../providers/auth/auth';
import {Component} from '@angular/core';
import {ToolsService} from "../../providers/tools";
import {IonicPage, MenuController, NavController, NavParams, Platform} from 'ionic-angular';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { InAppBrowser } from "@ionic-native/in-app-browser";

declare var google;

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
  map: any;
  stravaDatos: any;
  actividades: any;
  actividad: any;
  start_latitude: any;
  start_longitude: any;
  polyline: any;
  name: any;
  httpOptions;

  constructor(
    private _fb: FormBuilder,
    public nav: NavController, 
    public navParams: NavParams,
    public tools: ToolsService,
    public menu: MenuController,
    public auth: AuthProvider,
    public api: Api2Provider,
    public http: HttpClient,
    private geolocation: Geolocation,
    private iab: InAppBrowser,
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
    
    let parameter = {
      client_id: "28768",
      client_secret: "23597900cf3bcb0657ccc21683779e72798d6466",
      code: "b2e4e2821276c579debca304477b22738f97bf24",
      grant_type: ""
    };

    this.http.post('https://www.strava.com/oauth/token', parameter).subscribe(data => {
      this.stravaDatos = data.access_token;
      localStorage.setItem('token_strava', this.stravaDatos);
    });

    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token_strava')}`                 
        })
    };

    this.http.get('https://www.strava.com/api/v3/athlete/activities', this.httpOptions).subscribe(data => {
      this.actividades = data;
    });

  }

  onChangeRuta(event: Event, idRuta: string){
    this.http.get('https://www.strava.com/api/v3/activities/' + idRuta, this.httpOptions).subscribe(data => {
      this.actividad = data;
      this.start_latitude = data.start_latitude;
      this.start_longitude = data.start_longitude;
      this.polyline = data.map.polyline;
      this.name = data.name;
      this.getPosition();
    });
  }

  getPosition():any{

    this.geolocation.getCurrentPosition()
    .then(response => {
      this.loadMap(response);
    })
    .catch(error =>{
      console.log(error);
    })
  }

  loadMap(position: Geoposition){ 
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');

    // create LatLng object
    let latitude = this.start_latitude;
    let longitude = this.start_longitude;
    let myLatLng = {lat: latitude, lng: longitude};

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    
    var encodedPath= this.polyline;
    
    var decodedPath = google.maps.geometry.encoding.decodePath(encodedPath);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!'
      });
      mapEle.classList.add('show-map');
    });

    var flightPath = new google.maps.Polyline({
      path: decodedPath,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    flightPath.setMap(this.map);
  }

  ngOnDestroy() {
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
