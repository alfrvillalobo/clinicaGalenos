import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { user } from '../models/usuario';
import { StorageService } from './storage.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { agenda } from '../models/crearAgenda';
import { Observable, catchError, map, of } from 'rxjs';


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

  async getUserAdditionalInfoUsers(uid: string) {
    const userDoc = await this.firestore.collection('Usuarios').doc(uid).ref.get();
    if (userDoc.exists) {
      return userDoc.data();
    } else {
      return null;
    }
  }

  async getUserAdditionalInfoMedico(uid: string) {
    const userDoc = await this.firestore.collection('medicos').doc(uid).ref.get();
    if (userDoc.exists) {
      return userDoc.data();
    } else {
      return null;
    }
  }

  async getUserAdditionalInfoAdmin(uid: string) {
    const userDoc = await this.firestore.collection('admin').doc(uid).ref.get();
    if (userDoc.exists) {
      return userDoc.data();
    } else {
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

  async isMedico(uid: string): Promise<boolean> {
    const userDoc = await this.firestore.collection('medicos').doc(uid).ref.get();
    if (userDoc.exists) {
      const userData: any = userDoc.data(); // Especifica el tipo como any
      return userData.perfil === 'medico';
    } else {
      return false;
    }
  }

  async guardarHora(datosMedic: agenda) {
    // Validar que todos los campos necesarios estén llenos
    if (!datosMedic.nombreMedico || !datosMedic.especialidad || !datosMedic.horaDispo || !datosMedic.diaDispo || !datosMedic.sucursal) {
      throw new Error('Todos los campos deben completarse.');
    }

    try {
      // Asegúrate de tener la lógica adecuada para crear la hora en Firestore
      const result = await this.firestore.collection('HorasMedicas').add(datosMedic);
      return result;
    } catch (error) {
      throw error;
    }
  }

  getHorasMedicas(): Observable<agenda[]> {
    return this.firestore.collection<agenda>('HorasMedicas').valueChanges();
  }
  
  getUniqueSpecialities() {
    return this.firestore.collection<agenda>('HorasMedicas').get().pipe(
      map((querySnapshot) => {
        const especialidades: string[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as agenda;
          if (data && data.especialidad) {
            especialidades.push(data.especialidad);
          }
        });
        return Array.from(new Set(especialidades));
      })
    );
  }

  // Agrega este método para obtener las horas médicas filtradas por especialidad
  getHorasMedicasByEspecialidad(especialidad: string) {
    return this.firestore.collection<agenda>('HorasMedicas', ref => ref.where('especialidad', '==', especialidad))
      .valueChanges({ idField: 'id' });
  }
}
