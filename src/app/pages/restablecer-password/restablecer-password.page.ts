import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restablecer-password',
  templateUrl: 'restablecer-password.page.html',
  styleUrls: ['restablecer-password.page.scss'],
})
export class RestablecerPasswordPage {

  correoForm: FormGroup;

  constructor(
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // Simplificamos temporalmente la validación eliminando Validators.email
    this.correoForm = this.formBuilder.group({
      correoElectronico: ['', [Validators.required]]
    });
  }

  async enviarCorreo() {
    console.log('Formulario válido:', this.correoForm.valid);

    if (this.correoForm.valid) {
      console.log('Enviando correo...');

      // Aquí iría la lógica para enviar el correo electrónico

      const alert = await this.alertController.create({
        header: 'Correo Enviado',
        message: 'Se ha enviado un mensaje a su correo electrónico.',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              // Redirección a la página de home
              this.router.navigate(['/home']);
            }
          }
        ]
      });

      await alert.present();
    } else {
      console.log('Formulario inválido. Detalles:', this.correoForm.errors);

      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ingrese un correo electrónico válido. Asegúrese de seguir el formato correcto.',
        buttons: ['OK']
      });

      await alert.present();
    }
  }
}
