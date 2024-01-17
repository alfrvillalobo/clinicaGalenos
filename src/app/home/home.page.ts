import { Component, NgZone } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, AnimationController, Animation } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

import { ResourceLoader } from '@angular/compiler';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  credenciales = {
    correo: null,
    password: null
  };

  constructor(
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController,
    private ngZone: NgZone,
    private auth: AuthService,
    private helper: HelperService
  ) {}

 
  async login() {
    let navigationExtras: NavigationExtras = {
      state: {
        usuario: this.credenciales.correo
      }
    };
  
    if (this.credenciales && this.credenciales.correo !== null && this.credenciales.password !== null) {
      const loader = await this.helper.presentLoandig('Ingresando...');
  
      try {
        const res = await this.auth.login(this.credenciales.correo, this.credenciales.password);
        
        console.log('res -> ', res);
        loader.dismiss();
        this.helper.presentToast('Ingresado con éxito');
        this.router.navigate(['./tabs/Menu'], navigationExtras);
      } catch (error) {
        console.log('error', error);
        loader.dismiss();
        this.helper.presentToast('Usuario o contraseña inválidos');
      }
    } else {
      this.helper.presentToast('Por favor, complete todos los campos');
    }
  }  
}