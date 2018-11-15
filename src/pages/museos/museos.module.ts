import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MuseosPage } from './museos';

@NgModule({
  declarations: [
    MuseosPage,
  ],
  imports: [
    IonicPageModule.forChild(MuseosPage),
  ],
})
export class MuseosPageModule {}
