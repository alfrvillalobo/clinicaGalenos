import { Component } from '@angular/core';

@Component({
  selector: 'app-mi-agenda',
  templateUrl: 'mi-agenda.page.html',
  styleUrls: ['mi-agenda.page.scss'],
})
export class MiAgendaPage {
  mostrarDetallesCard: boolean = false;
  nombreDoctor: string = 'Nombre del Doctor';
  fechaHoraCita: string = 'Fecha y Hora de la Cita';

  mostrarDetalles() {
    // Si ya se están mostrando los detalles, ocultarlos; de lo contrario, mostrarlos
    this.mostrarDetallesCard = !this.mostrarDetallesCard;

    // Si se están mostrando los detalles, obtener y mostrar información
    if (this.mostrarDetallesCard) {
      // Lógica para obtener detalles de la cita, por ejemplo, desde un servicio
      // Aquí se usa información estática como ejemplo
      this.nombreDoctor = 'Dr. Ejemplo';
      this.fechaHoraCita = 'Ejemplo: 10 de enero de 2024, 15:00';
    }
  }
}

