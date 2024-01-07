import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainMedicosPageRoutingModule } from './main-medicos-routing.module';

import { MainMedicosPage } from './main-medicos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainMedicosPageRoutingModule
  ],
  declarations: [MainMedicosPage]
})
export class MainMedicosPageModule {}
