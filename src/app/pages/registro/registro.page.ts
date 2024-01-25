import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { user } from 'src/app/models/usuario/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-registro',
  templateUrl: 'registro.page.html',
  styleUrls: ['registro.page.scss'],
})
export class RegistroPage {

  datos: user = {
    nombre: '',
    correo: '',
    rut: '',
    prevision: '',
    numero: '',
    password: '',
    uid: '',
    perfil: 'paciente'
  }

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private auth: AuthService,
    private store: StorageService,
    private helper: HelperService,
    private router: Router
  ) {}

  async registrar() {
    this.helper.presentLoandig('Registrando...');

    try {
      
      const res = await this.auth.registrarUser(this.datos);

      if (res && res.user) {
        console.log('exito al crear usuario');
        const path = 'Usuarios';
        const id = res.user.uid;
        this.datos.uid = id;
        this.datos.password = ''; 
        await this.store.createDoc(this.datos, path, id);
        this.helper.presentToast('Registrado con éxito');
        this.router.navigate(['/home']);
      } else {
        this.helper.presentToast('Error en el registro');
        console.log('Error: ', res); 
      }
    } catch (error) {
      this.helper.presentToast('Error en el registro');
      console.log('Error: ', error);
    } finally {
      this.helper.loadingController.dismiss();
    }
  }
}