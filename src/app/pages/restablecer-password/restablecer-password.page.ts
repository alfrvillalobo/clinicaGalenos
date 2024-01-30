import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-restablecer-password',
  templateUrl: 'restablecer-password.page.html',
  styleUrls: ['restablecer-password.page.scss'],
})
export class RestablecerPasswordPage {

  correoForm: FormGroup;
  correoParaReset: string = '';
  correo: string = '';


  constructor(
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private helper: HelperService,
    private router: Router,
    private navCtrl: NavController
  ) {
    // Simplificamos temporalmente la validación eliminando Validators.email
    this.correoForm = this.formBuilder.group({
      correoElectronico: ['', [Validators.required]]
    });
  }
  
  async resetPassword() {
    if (this.correo) {
      const resetSuccessful = await this.authService.resetPassword(this.correo);

      if (resetSuccessful !== undefined && resetSuccessful) {
        console.log('Correo de restablecimiento enviado correctamente.');
      } else {
        console.error('Error al enviar el correo de restablecimiento.');
      }
    } else {
      console.error('Por favor, ingresa tu dirección de correo electrónico.');
    }
  }
}
