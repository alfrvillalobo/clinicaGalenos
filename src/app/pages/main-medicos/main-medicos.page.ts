import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController } from '@ionic/angular';
import { agenda } from 'src/app/models/crearAgenda';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-main-medicos',
  templateUrl: './main-medicos.page.html',
  styleUrls: ['./main-medicos.page.scss'],
})
export class MainMedicosPage implements OnInit {

  isMedico?: boolean;
  datosMedic: agenda = {
    nombre: '',
    apellido: '',
    especialidad: '',
    horaDispo: '',
    diaDispo: '',
    sucursal: '',
    uid: '',
    tomada: false
  }

  constructor(private authService: AuthService,
              private firestore: AngularFirestore,
              private helper: HelperService,
              private auth: AuthService,
              private store: StorageService,
              private loadingController: LoadingController
              ) { }

    ngOnInit() {
      this.authService.getCurrentUser().subscribe(async (user) => {
        if (user) {
          this.isMedico = await this.authService.isMedico(user.uid);
    
          if (this.isMedico) {
            // Obtener información adicional del médico
            const medicoData: any = await this.authService.getUserAdditionalInfoMedico(user.uid);
            if (medicoData) {
              this.datosMedic.nombre = medicoData.nombre;
              this.datosMedic.apellido = medicoData.apellido;
            }
          } else {
          }
        }
      });
    }
    
    async crearHora() {
      try {
        const res = await this.auth.guardarHora(this.datosMedic);
    
        if (res) {
          const loading = await this.loadingController.create({
            message: 'Generando hora...'
          });
          await loading.present();
    
          console.log('exito al crear hora medica');
          const id = res.id;
          this.datosMedic.uid = id;
          await this.store.createDoc(this.datosMedic, 'HorasMedicas', id);
          this.helper.presentToast('Hora médica creada con éxito');
        } else {
          this.helper.presentToast('Error al crear hora médica');
        }
      } catch (error) {
        this.helper.presentToast('Error al crear hora médica');
        console.log('Error al crear hora médica');
      } finally {
        try {
          await this.loadingController.dismiss();
        } catch (error) {
        }
      }
    }



/*
    async crearHora() {
      if (!this.camposValidos()) {
        this.helper.presentToast('Por favor, complete todos los campos');
        return;
      }
  
      try {
        const res = await this.auth.guardarHora(this.datosMedic);
  
        if (res) {
          // Resto del código...
        } else {
          this.helper.presentToast('Error al crear hora médica');
        }
      } catch (error) {
        this.helper.presentToast('Error al crear hora médica');
        console.log('Error: ', error);
      } finally {
        this.helper.loadingController.dismiss();
      }
    }
  
    camposValidos(): boolean {
      const { nombre, apellido, especialidad, horaDispo, diaDispo, sucursal } = this.datosMedic;
  
      // Verificar que todos los campos esenciales estén completos
      if (!nombre || !apellido || !especialidad || !horaDispo || !diaDispo || !sucursal) {
        return false;
      }
  
      // Puedes agregar otras validaciones según tus requisitos
      // Por ejemplo, verificar el formato de la hora, día, etc.
  
      return true;
    }
    */
}
