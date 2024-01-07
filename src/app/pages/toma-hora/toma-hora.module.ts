import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TomaHoraPageRoutingModule } from './toma-hora-routing.module';

import { TomaHoraPage } from './toma-hora.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TomaHoraPageRoutingModule
  ],
  declarations: [TomaHoraPage]
})
export class TomaHoraPageModule {}
