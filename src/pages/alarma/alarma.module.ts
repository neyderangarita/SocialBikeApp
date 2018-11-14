import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlarmaPage } from './alarma';

@NgModule({
  declarations: [
    AlarmaPage,
  ],
  imports: [
    IonicPageModule.forChild(AlarmaPage),
  ],
})
export class AlarmaPageModule {}
