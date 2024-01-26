// Importa los módulos necesarios
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { agenda } from 'src/app/models/crearAgenda';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private authService: AuthService) {}

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
    this.authService.getHorasMedicas().subscribe((horasMedicas) => {
      this.horasMedicas = horasMedicas;
    });
  }

  aplicarFiltro() {
    // Aplicar el filtro según la especialidad seleccionada
    this.authService.getHorasMedicasByEspecialidad(this.filtroEspecialidad).subscribe((horasMedicas) => {
      this.horasMedicas = horasMedicas;
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
}
