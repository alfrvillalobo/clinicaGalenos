import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { user } from '../models/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularfire: AngularFireAuth) { }

  login(correo:string, password: string) {
    return this.angularfire.signInWithEmailAndPassword(correo,password);    
  }
  Logut(){
    this.angularfire.signOut();
  }

  registrarUser(datos: user) {
    return this.angularfire.createUserWithEmailAndPassword(datos.correo, datos.password);
  }
}
