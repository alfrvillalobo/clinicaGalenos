import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'main-paciente',
    loadChildren: () => import('./pages/main-paciente/main-paciente.module').then( m => m.MainPacientePageModule)
  },
  {
    path: 'main-admin',
    loadChildren: () => import('./pages/main-admin/main-admin.module').then( m => m.MainAdminPageModule)
  },
  {
    path: 'main-medicos',
    loadChildren: () => import('./pages/main-medicos/main-medicos.module').then( m => m.MainMedicosPageModule)
  },
  {
    path: 'restablecer-password',
    loadChildren: () => import('./pages/restablecer-password/restablecer-password.module').then( m =>  m.RestablecerPasswordPageModule)
  },
  {
    path: 'toma-hora',
    loadChildren: () => import('./pages/toma-hora/toma-hora.module').then( m => m.TomaHoraPageModule)
  },
  {
    path: 'mi-agenda',
    loadChildren: () => import('./pages/mi-agenda/mi-agenda.module').then( m => m.MiAgendaPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
