import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.page.html',
  styleUrls: ['./examenes.page.scss'],
})
export class ExamenesPage{

  public cardInfo = [
    { title: 'Electrocardiograma', content: 'Información de la tarjeta 1.' },
    { title: 'Pruebas cardiológicas', content: 'Información de la tarjeta 2.' },
    { title: 'Análisis de sangre y orina.', content: 'Información de la tarjeta 3.' },
  ];

  public selectedCard: any = null;

  constructor() { }

  showCardInfo(card: any) {
    this.selectedCard = card;
  }

}
