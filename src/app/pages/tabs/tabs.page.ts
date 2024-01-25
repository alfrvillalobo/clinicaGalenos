import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/models/usuario';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  rol: 'paciente' | 'admin' | 'medico' | null = null;


  state : any;  
  constructor(private router : Router,
              private storage: StorageService) { }

  ngOnInit(): void {
    this.state = this.router.getCurrentNavigation()?.extras.state;
    if (this.state && this.state.uid) {
      this.getDatosUser(this.state.uid);
    }
  }
  
  getDatosUser(uid: string) {
    const path = 'Usuarios';
    const id = uid;
    this.storage.getDoc<user>(path, id).subscribe( res => {
      console.log('datos -> ', res);
      if (res) {
        this.rol =res.perfil;
      }
    })
  }
}
