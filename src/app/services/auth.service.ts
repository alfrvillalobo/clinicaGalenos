import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { user } from '../models/usuario/usuario';
import { StorageService } from './storage.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularfire: AngularFireAuth,
              private afAuth: AngularFireAuth,
              private firestore: AngularFirestore) { }

  login(correo:string, password: string) {
    return this.angularfire.signInWithEmailAndPassword(correo,password);    
  }
  Logut(){
    this.angularfire.signOut();
  }

  registrarUser(datos: user) {
    return this.angularfire.createUserWithEmailAndPassword(datos.correo, datos.password);
  }

  getCurrentUser() {
    return this.afAuth.authState;
  }

  async getUserAdditionalInfo(uid: string) {
    const userDoc = await this.firestore.collection('Usuarios').doc(uid).ref.get();
    if (userDoc.exists) {
      return userDoc.data();
    } else {
      console.log('Usuario no encontrado en Firestore');
      return null;
    }
  }

  async isAdmin(uid: string): Promise<boolean> {
    const userDoc = await this.firestore.collection('admin').doc(uid).ref.get();
    if (userDoc.exists) {
      const userData: any = userDoc.data(); // Especifica el tipo como any
      return userData.perfil === 'admin';
    } else {
      return false;
    }
  }
}
