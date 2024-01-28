import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmiMedicosPageRoutingModule } from './admi-medicos-routing.module';

import { AdmiMedicosPage } from './admi-medicos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmiMedicosPageRoutingModule
  ],
  declarations: [AdmiMedicosPage]
})
export class AdmiMedicosPageModule {}
