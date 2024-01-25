import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-medicos',
  templateUrl: './main-medicos.page.html',
  styleUrls: ['./main-medicos.page.scss'],
})
export class MainMedicosPage implements OnInit {

  isMedico?: boolean;
  

  constructor(private authService: AuthService,
    private firestore: AngularFirestore) { }

    ngOnInit() {
      this.authService.getCurrentUser().subscribe(async (user) => {
        if (user) {
          this.isMedico = await this.authService.isMedico(user.uid);
    
          if (!this.isMedico) {
            console.log('Acceso no autorizado');
          } 
        }
      });
    }
    
}
