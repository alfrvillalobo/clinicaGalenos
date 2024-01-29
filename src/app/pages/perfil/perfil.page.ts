import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userData: any;
  medicData: any;
  adminData: any;

  constructor(
    private router: Router,
    private auth: AuthService,
    private helper: HelperService
  ) { }

  ngOnInit() {
    this.auth.getCurrentUser().subscribe(async (user) => {
      if (user) {
        this.userData = await this.auth.getUserAdditionalInfoUsers(user.uid);
        this.medicData = await this.auth.getUserAdditionalInfoMedico(user.uid);
        this.adminData = await this.auth.getUserAdditionalInfoAdmin(user.uid);
      }
    });
  }

  async logout() {
    const result = await this.helper.presentAlert(
      'Cerrar Sesión',
      '¿Está seguro de que desea cerrar sesión?',
      ''
    );

    if (result) {
      await this.auth.Logout();
      console.log('Cierre de sesión exitoso');
      this.helper.presentToast('Cierre de sesión exitoso');
      this.router.navigate(['/home']);
    }
  }
}
