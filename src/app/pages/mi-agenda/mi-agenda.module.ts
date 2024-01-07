import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiAgendaPageRoutingModule } from './mi-agenda-routing.module';

import { MiAgendaPage } from './mi-agenda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiAgendaPageRoutingModule
  ],
  declarations: [MiAgendaPage]
})
export class MiAgendaPageModule {}
