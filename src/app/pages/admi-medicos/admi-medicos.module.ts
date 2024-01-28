import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmiMedicosPageRoutingModule } from './admi-medicos-routing.module';

import { AdmiMedicosPage } from './admi-medicos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmiMedicosPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AdmiMedicosPage]
})
export class AdmiMedicosPageModule {}
