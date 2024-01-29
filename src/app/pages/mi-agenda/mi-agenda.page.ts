import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-mi-agenda',
  templateUrl: 'mi-agenda.page.html',
  styleUrls: ['mi-agenda.page.scss'],
})
export class MiAgendaPage implements OnInit {
  horasTomadas: any[] = []; // Ajusta el tipo según la estructura de tus datos

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.cargarHorasTomadas();
  }

  cargarHorasTomadas() {
    // Reemplaza 'horasTomadas' con el nombre correcto de tu colección
    this.firestore
      .collection('horasTomadas')
      .valueChanges({ idField: 'id' })
      .subscribe((horasTomadas: any[]) => {
        this.horasTomadas = horasTomadas;
      });
  }
}
