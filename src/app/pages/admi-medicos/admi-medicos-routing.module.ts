import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmiMedicosPage } from './admi-medicos.page';

const routes: Routes = [
  {
    path: '',
    component: AdmiMedicosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmiMedicosPageRoutingModule {}
