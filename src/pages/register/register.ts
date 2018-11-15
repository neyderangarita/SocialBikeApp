import {Component, OnInit} from "@angular/core";
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {IonicPage, NavController, MenuController} from "ionic-angular";
import { User } from "../../shared/models/user";
import {ToolsService} from "../../providers/tools";
import { Api2Provider } from './../../providers/api2/api2';

@IonicPage({
  name: 'page-register',
  segment: 'register',
  priority: 'high'
})

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})


export class RegisterPage implements OnInit {

  public onRegisterForm: FormGroup;
  user = {} as User;

  constructor(
    private _fb: FormBuilder, 
    public nav: NavController,
    public tools: ToolsService, 
    public menu: MenuController,
    public api: Api2Provider,
    ) {
    this.menu.swipeEnable(false);
    this.menu.enable(false);
  }

  ngOnInit() {
    this.onRegisterForm = this._fb.group({
      username: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])],
      nombre: ['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required
      ])],
      fechaNacimiento: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  // register and go to page-programacion
  register(user: User) {
    let parameter = {
      username: user.username,
      password: user.password,
      email: user.email,
      name: user.nombre,
      fecnac: user.fechaNacimiento,
    };
    this.api.callPetition('signup/', 'POST', parameter)
    .then(data => {
      this.nav.setRoot('page-programacion');
      this.tools.notify("Se ha registrado el usuario correctamente");
    });
  }

  // go to login page
  login() {
    this.nav.setRoot('page-login');
  }

}
