import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPacientePageRoutingModule } from './main-paciente-routing.module';

import { MainPacientePage } from './main-paciente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPacientePageRoutingModule
  ],
  declarations: [MainPacientePage]
})
export class MainPacientePageModule {}
