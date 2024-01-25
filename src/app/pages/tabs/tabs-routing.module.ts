import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { MedicoGuard } from 'src/app/guards/medico.guard';


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
      {
        path: 'MainAdmin',
        loadChildren: () => import('../../pages/main-admin/main-admin.module').then( m => m.MainAdminPageModule),
        canActivate: [AuthGuard],
      },
      {
      path: 'MainMedico',
      loadChildren: () => import('../../pages/main-medicos/main-medicos.module').then( m => m.MainMedicosPageModule),
      canActivate: [MedicoGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
