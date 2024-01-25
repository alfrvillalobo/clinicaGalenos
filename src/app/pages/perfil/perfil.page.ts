import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  nombre: string = 'Nombre del Usuario';
  rut: string = '123456789';
  prevision: string = 'Isapre';
  email: string = 'usuario@example.com';
  numero: string = '123456789';
  userData: any;
  medicData: any;

  constructor(private router: Router,            
              private auth: AuthService,
              private helper: HelperService) {}
  ngOnInit() {
    this.auth.getCurrentUser().subscribe(async (user) => {
      if (user) {
        // Aquí puedes hacer algo con la información del usuario
        this.userData = await this.auth.getUserAdditionalInfoUsers(user.uid);
        this.medicData = await this.auth.getUserAdditionalInfoMedico(user.uid);
      }
    });
  }

  logout() {
    this.auth.Logut();
    this.helper.presentToast('Cierre de sesión exitoso');
    this.router.navigate(['/home']);
  }
}
