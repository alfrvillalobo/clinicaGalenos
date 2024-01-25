import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.page.html',
  styleUrls: ['./main-admin.page.scss'],
})
export class MainAdminPage implements OnInit {

  isAdmin?: boolean;
  usuarios: any[] = [];
  editingUser: any = null;
  editedUser: any = {};

  constructor(private authService: AuthService,
              private firestore: AngularFirestore,
              private helper: HelperService) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(async (user) => {
      if (user) {
        this.isAdmin = await this.authService.isAdmin(user.uid);

        if (!this.isAdmin) {
          console.log('Acceso no autorizado');
          // Aquí puedes redirigir a otra página o mostrar un mensaje al usuario
        } else {
          // Si es admin, carga la lista de usuarios
          this.loadUsuarios();
        }
      }
    });
  }

  loadUsuarios() {
    this.firestore.collection('Usuarios').valueChanges().subscribe((data) => {
      this.usuarios = data;
    });
  }

  async eliminarUsuario(uid: string) {
    try {
      await this.firestore.collection('Usuarios').doc(uid).delete();
      this.helper.presentToast('Usuario eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar usuario', error);
      this.helper.presentToast('Error al eliminar usuario');
    }
  }

  editarUsuario(usuario: any) {
    this.editingUser = usuario;
    this.editedUser = { ...usuario }; // Hacer una copia del usuario para editar
  }

  // Método para guardar los cambios en un usuario editado
  guardarCambios() {
    const uid = this.editingUser.uid;
    this.firestore.collection('Usuarios').doc(uid).update(this.editedUser)
      .then(() => {
        this.helper.presentToast('Cambios guardados con éxito');
        this.cancelarEdicion();
      })
      .catch((error) => {
        console.error('Error al guardar cambios', error);
        this.helper.presentToast('Error al guardar cambios');
      });
  }

  // Método para cancelar la edición
  cancelarEdicion() {
    this.editingUser = null;
    this.editedUser = {};
  }
}
