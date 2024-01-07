import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TomaHoraPage } from './toma-hora.page';

const routes: Routes = [
  {
    path: '',
    component: TomaHoraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TomaHoraPageRoutingModule {}
