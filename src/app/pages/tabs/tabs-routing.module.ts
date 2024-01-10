import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { MainAdminPage } from '../main-admin/main-admin.page';
import { MainPacientePage } from '../main-paciente/main-paciente.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'Menu',
        loadChildren: () => import('../../pages/main-paciente/main-paciente.module').then(m => m.MainPacientePageModule),
      },
      {
        path: 'TomadeHora',
        loadChildren: () => import('../../pages/toma-hora/toma-hora.module').then(m => m.TomaHoraPageModule),
      },
      {
        path: 'MiAgenda',
        loadChildren: () => import('../../pages/mi-agenda/mi-agenda.module').then(m => m.MiAgendaPageModule),
      },
      {
        path: 'Perfil',
        loadChildren: () => import('../../pages/perfil/perfil.module').then(m => m.PerfilPageModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
