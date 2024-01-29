import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
              private store: StorageService
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
          this.helper.presentLoandig('Generando hora...');
          console.log('exito al crear hora medica');
          const id = res.id; // Utiliza 'id' en lugar de 'agenda.uid'
          this.datosMedic.uid = id;
          await this.store.createDoc(this.datosMedic, 'HorasMedicas', id);
          this.helper.presentToast('Hora médica creada con éxito');
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

}
