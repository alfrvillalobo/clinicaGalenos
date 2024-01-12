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
    // Esta función se ejecuta cuando la vista está a punto de entrar
    // Puedes iniciar la animación y la navegación aquí
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

    // Simulación de una tarea asíncrona (puedes reemplazar esto con tu lógica de inicio de sesión real)
    const loggedIn = await this.simulateLogin();

    if (loggedIn) {
      this.ngZone.run(() => {
        // Dentro de la zona para asegurarnos de que Angular detecte los cambios
        this.router.navigate(['/tabs/Menu']);
      });
    } else {
      this.isLoading = false;
      this.presentAlert('Usuario o contraseña incorrectos');
    }
  }

  simulateLogin(): Promise<boolean> {
    // Simulación de una tarea asíncrona
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.usuario === 'usuario' && this.password === '123456');
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
        .fromTo('opacity', '1', '0.1');

      // Promesa que se resuelve cuando la animación ha terminado
      await animation.play().then(() => {});

      // Después de la animación, navega a la próxima página
      this.router.navigate(['/tabs/Menu']);
    } else {
      console.error('Elemento .login-card no encontrado.');
    }
  }

  register() {
    this.router.navigateByUrl;
  }

  restablecerPassword() {
    this.router.navigateByUrl;
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
