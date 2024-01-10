// perfil.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss'],
})
export class PerfilPage {
  nombre: string = 'Nombre del Usuario';
  rut: string = '123456789';
  prevision: string = 'Isapre';
  email: string = 'usuario@example.com';
  numero: string = '123456789';

  constructor(private router: Router) {}

  cerrarSesion() {
    
    this.router.navigateByUrl;
  }
}
