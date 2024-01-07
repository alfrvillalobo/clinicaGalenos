import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPacientePage } from './main-paciente.page';

const routes: Routes = [
  {
    path: '',
    component: MainPacientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPacientePageRoutingModule {}
