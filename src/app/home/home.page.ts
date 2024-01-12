import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationController, Animation } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuario: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController,
    private ngZone: NgZone
  ) {}

  ionViewWillEnter() {
    this.animateAndNavigate();
  }

  async login() {
    if (!this.usuario) {
      this.presentAlert('Necesita ingresar un nombre de usuario');
      return;
    }

    if (!this.password) {
      this.presentAlert('Necesita agregar una contraseña');
      return;
    }

    this.isLoading = true;

    const loggedIn = await this.simulateLogin();

    if (loggedIn) {
      this.ngZone.run(() => {
        this.showLoadingAnimation();

        setTimeout(() => {
          this.hideLoadingAnimation();
          this.presentWelcomeAlert();
          this.router.navigate(['/tabs/Menu']);
        }, 2000);
      });
    } else {
      this.isLoading = false;
      this.presentAlert('Usuario o contraseña incorrectos');
    }
  }

  simulateLogin(): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.usuario === 'pedrito' && this.password === '123456');
      }, 2000);
    });
  }

  async animateAndNavigate() {
    const loginCardElement = document.querySelector('.login-card');
  
    if (loginCardElement) {
      const animation: Animation = this.animationController.create()
        .addElement(loginCardElement)
        .duration(1000)
        .iterations(1)
        .fromTo('opacity', '1', '0.1')
        .fromTo('translateY', '0px', '-100px');
  
      await animation.play().then(() => {});
      loginCardElement.classList.add('animated'); // Agrega clase de animación
  
      this.router.navigate(['/tabs/Menu']);
    } else {
      console.error('Elemento .login-card no encontrado.');
    }
  }
  

  showLoadingAnimation() {
    const appRoot = document.querySelector('ion-app');
    if (appRoot) {
      appRoot.classList.add('loading-animation');
    } else {
      console.error('Elemento ion-app no encontrado.');
    }
  }
  
  hideLoadingAnimation() {
    const appRoot = document.querySelector('ion-app');
    if (appRoot) {
      appRoot.classList.remove('loading-animation');
    } else {
      console.error('Elemento ion-app no encontrado.');
    }
  }
  

  async presentWelcomeAlert() {
    const welcomeAlert = await this.alertController.create({
      header: 'Bienvenido',
      message: `¡Bienvenido, ${this.usuario}!`,
      buttons: ['OK']
    });

    await welcomeAlert.present();
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
