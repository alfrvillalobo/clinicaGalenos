// Importa los módulos necesarios
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { agenda } from 'src/app/models/crearAgenda';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-toma-hora',
  templateUrl: 'toma-hora.page.html',
  styleUrls: ['toma-hora.page.scss'],
})
export class TomaHoraPage implements OnInit {
  isModalOpen = false;
  horasMedicas: agenda[] = [];
  especialidad: string[] = [];
  filtroEspecialidad: string = '';
  

  constructor(private authService: AuthService, private firestore: AngularFirestore,private helper: HelperService) {}

  ngOnInit() {
    // Utilizamos la alternativa con *ngFor para obtener especialidades
    this.authService.getUniqueSpecialities().subscribe((especialidades) => {
      this.especialidad = especialidades;
    });

    // Cargar todas las horas médicas al inicio
    this.loadAllData();
  }

  // Método para cargar todas las horas médicas
  loadAllData() {
    // Agrega un filtro para obtener solo las horas médicas no tomadas
    this.authService.getHorasMedicas().subscribe((horasMedicas) => {
      this.horasMedicas = horasMedicas.filter(hora => !hora.tomada);
    });
  }

  aplicarFiltro() {
    // Aplicar el filtro según la especialidad seleccionada y que la hora no esté tomada
    this.authService.getHorasMedicasByEspecialidad(this.filtroEspecialidad).subscribe((horasMedicas) => {
      this.horasMedicas = horasMedicas.filter(hora => !hora.tomada);
    });
  }
  

  resetearFiltro() {
    // Restaurar la lista de horas médicas original sin filtrar
    this.loadAllData();
    this.filtroEspecialidad = '';
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async guardarHoraTomada(horaMedica: agenda) {
    try {
      // Verificar si la hora ya ha sido tomada
      const horaExistente = await this.firestore.collection('HorasMedicas').doc(horaMedica.uid).ref.get();
  
      // Asegurar que la data tenga el tipo correcto (en este caso, any)
      const data = horaExistente.data() as any;
  
      if (!data.tomada) {
        // Marcar la hora como tomada
        await this.firestore.collection('HorasMedicas').doc(horaMedica.uid).update({ tomada: true });
  
        // Guardar la hora tomada en 'horasTomadas'
        await this.firestore.collection('horasTomadas').add(horaMedica);
  
        // Log después de guardar exitosamente
        console.log('La hora médica tomada se ha guardado con éxito en horasTomadas:', horaMedica);
        this.helper.presentToast('Hora médica guardada con éxito');
      } else {
        // La hora ya ha sido tomada
        console.warn('La hora médica ya ha sido tomada anteriormente.');
      }
    } catch (error) {
      // Manejo de errores
      console.error('Error al intentar guardar la hora médica tomada:', error);
    }
  }
  
}
