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
  numero: string | undefined;

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  async registrar() {
    console.log('Registro intentado');
  
    if (!this.camposCompletados()) {
      console.log('Campos incompletos');
      // Muestra un mensaje de error si no todos los campos están completados
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos antes de registrar.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return;
    }

    // Validar el formato del correo electrónico
    if (!this.validarEmail(this.email)) {
      // Muestra un mensaje de error si el formato del correo electrónico no es válido
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingrese un formato de correo electrónico válido.',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }
  
    // Asegúrate de que this.numero no sea undefined antes de llamar a validarNumero
    if (typeof this.numero !== 'undefined') {
      // Convertir la cadena a un número antes de la validación
      const numeroComoNumero = +this.numero;
  
      console.log('Validando número:', numeroComoNumero);
      if (!this.validarNumero(numeroComoNumero)) {
        console.log('Número inválido');
        // Muestra un mensaje de error si el número no cumple con los requisitos
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Por favor, ingrese un número de 9 dígitos.',
          buttons: ['Aceptar']
        });
  
        await alert.present();
        return;
      }
    } else {
      console.log('Número undefined');
    }
  
    console.log('Simulando tiempo de espera');
    await this.simularTiempoEspera(1000);
  
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

  private camposCompletados(): boolean {
    // Verifica que todos los campos estén completados
    return (
      !!this.nombre && !!this.rut && !!this.prevision && !!this.email && this.numero !== undefined
    );
  }

  private validarNumero(numero: number): boolean {
    // Verifica que el número sea un valor numérico y tiene exactamente 9 dígitos
    return typeof numero === 'number' && /^[0-9]{9}$/.test(numero.toString());
  }

  private validarEmail(email: string): boolean {
    // Expresión regular para validar el formato de un correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}
