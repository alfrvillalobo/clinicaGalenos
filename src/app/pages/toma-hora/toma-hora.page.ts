import { ChangeDetectorRef, Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-toma-hora',
  templateUrl: 'toma-hora.page.html',
  styleUrls: ['toma-hora.page.scss'],
})
export class TomaHoraPage {
  sucursales = ['Clinica Galenos Norte', 'Clinica Galenos Sur'];
  especialidades = ['Medicina General', 'Kinesiología', 'Oftalmología', 'Otorrinolaringología'];
  medicosDisponibles = [
    { nombre: 'Dr. Juan Pérez', especialidad: 'Medicina General', horaDisponible: '09:00 AM' },
    { nombre: 'Dra. Maria Rodriguez', especialidad: 'Kinesiología', horaDisponible: '10:30 AM' },
    { nombre: 'Dr. Carlos González', especialidad: 'Oftalmología', horaDisponible: '11:45 AM' },
    { nombre: 'Dra. Laura Ramirez', especialidad: 'Otorrinolaringología', horaDisponible: '02:15 PM' },
  ];

  selectedSucursal: string | null = null;
  selectedEspecialidad: string | null = null;
  medicosFiltrados: any[] = [];
  mostrarMedicos: boolean = false;

  constructor(private cdr: ChangeDetectorRef,private zone: NgZone) {}

  filtrarMedicos(): void {
    if (this.selectedSucursal !== null && this.selectedEspecialidad !== null && this.buscarMedicosClickeado) {
      // Mostrar los médicos solo cuando se ha hecho clic en "Buscar Médicos"
      this.medicosFiltrados = this.medicosDisponibles;
      this.mostrarMedicos = true;
    } else {
      // Limpiar la lista si no se han seleccionado ambas opciones o no se ha hecho clic en "Buscar Médicos"
      this.medicosFiltrados = [];
      this.mostrarMedicos = false;
    }
  }

  // Agregamos una variable para rastrear si se ha hecho clic en "Buscar Médicos"
  buscarMedicosClickeado: boolean = false;

  // Agregamos una función para cambiar el estado de buscarMedicosClickeado cuando se hace clic en el botón correspondiente
  clicBuscarMedicos(): void {
    this.buscarMedicosClickeado = true;
    // Llamamos a la función para filtrar médicos después de hacer clic en "Buscar Médicos"
    this.filtrarMedicos();
  }
  
}
