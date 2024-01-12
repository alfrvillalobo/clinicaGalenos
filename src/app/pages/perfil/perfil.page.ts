import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  constructor(private router: Router, private alertController: AlertController) {}

  async confirmarCerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Desea cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {           
          },
        },
        {
          text: 'Sí',
          handler: () => {
            this.cerrarSesion();
          },
        },
      ],
    });

    await alert.present();
  }

  cerrarSesion() {    
    this.router.navigateByUrl('/home');
  }
}
