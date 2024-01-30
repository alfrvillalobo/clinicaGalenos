import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { user } from 'src/app/models/usuario';
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
    private auth: AuthService,
    private store: StorageService,
    private helper: HelperService,
    private router: Router
  ) {}

  async registrar() {
    if (!this.datos.nombre || !this.datos.correo || !this.datos.rut || !this.datos.prevision || !this.datos.numero || !this.datos.password) {
      this.helper.presentToast('Todos los campos son obligatorios');
      return;
    }
  
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
      }
    } catch (error) {
      this.helper.presentToast('Error en el registro');
    } finally {
      this.helper.loadingController.dismiss();
    }
  }
  
}