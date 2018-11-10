import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProgramacionPage } from './programacion';

@NgModule({
  declarations: [
    ProgramacionPage,
  ],
  imports: [
    IonicPageModule.forChild(ProgramacionPage),
  ],
  exports: [
  ProgramacionPage
  ]
})
export class ProgramacionPageModule {}
