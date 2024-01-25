import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService) {}

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ngOnInit() {
    this.authService.getHorasMedicas().subscribe((horasMedicas) => {
      this.horasMedicas = horasMedicas;
    });
  }
  
}
