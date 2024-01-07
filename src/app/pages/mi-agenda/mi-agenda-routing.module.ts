import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiAgendaPage } from './mi-agenda.page';

const routes: Routes = [
  {
    path: '',
    component: MiAgendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiAgendaPageRoutingModule {}
