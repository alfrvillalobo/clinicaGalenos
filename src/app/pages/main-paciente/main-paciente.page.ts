import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-paciente',
  templateUrl: 'main-paciente.page.html',
  styleUrls: ['main-paciente.page.scss'],
})
export class MainPacientePage {

  

  constructor(private router: Router) {}

  
  irAExamenes(): void {
    this.router.navigateByUrl;
  }

  
  irATomarHora(): void {
    this.router.navigateByUrl;
  }

  

  
}

