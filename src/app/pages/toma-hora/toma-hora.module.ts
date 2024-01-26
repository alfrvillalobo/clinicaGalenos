import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import { TomaHoraPageRoutingModule } from './toma-hora-routing.module';

import { TomaHoraPage } from './toma-hora.page';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TomaHoraPageRoutingModule
  ],
  declarations: [TomaHoraPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TomaHoraPageModule {}
