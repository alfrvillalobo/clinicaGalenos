import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  credenciales = {
    correo: '' as string,
    password: '' as string
  };

  constructor(
    private router: Router,   
    private auth: AuthService,
    private helper: HelperService
  ) {}

  async login() {
    let navigationExtras: NavigationExtras = {
      state: {
        usuario: this.credenciales.correo
      }
    };
  
    if (
      this.credenciales &&
      this.credenciales.correo.trim() !== '' &&
      this.credenciales.password.trim() !== ''
    ) {
      const loader = await this.helper.presentLoandig('Ingresando...');
  
      try {
        const userCredential = await this.auth.login(this.credenciales.correo, this.credenciales.password);
        const user = userCredential.user;
       
        loader.dismiss();
  
        if (user) {
          if (await this.auth.isAdmin(user.uid) || await this.auth.isMedico(user.uid)) {
            this.router.navigate(['./tabs/Perfil'], navigationExtras);
          } else {
            this.helper.presentToast('Ingresado con éxito');
            this.router.navigate(['./tabs/Menu'], navigationExtras);
          }
        }
      } catch (error: any) {
        console.log('error', error);
        loader.dismiss();

        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          this.helper.presentToast('Usuario o contraseña incorrectos');
        } else {
          this.helper.presentToast('Ocurrió un error durante el inicio de sesión');
        }
      }
    } else {
      this.helper.presentToast('Por favor, complete todos los campos');
    }
  }
}
