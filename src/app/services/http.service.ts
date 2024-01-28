
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl = 'assets/files/datosMedicos.json';

  constructor(private http: HttpClient) { }

  getMedicos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  guardarCambios(medicos: any[]): Observable<any> {
    // Realiza una solicitud HTTP para guardar los cambios en el archivo JSON
    return this.http.put(this.apiUrl, { datMedic: medicos });
  }
}
