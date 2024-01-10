// registro.page.ts

import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: 'registro.page.html',
  styleUrls: ['registro.page.scss'],
})
export class RegistroPage {

  nombre!: string;
  rut!: string;
  prevision!: string;
  email!: string;
  numero!: string;

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  async registrar() {    
    await this.simularTiempoEspera;

    
    const alert = await this.alertController.create({
      header: 'Registro completado',
      message: 'El registro fue completado con éxito.',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {            
            this.navCtrl.navigateForward('/home');
          }
        }
      ]
    });

    await alert.present();
  }

  private simularTiempoEspera(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

