import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admi-medicos',
  templateUrl: './admi-medicos.page.html',
  styleUrls: ['./admi-medicos.page.scss'],
})
export class AdmiMedicosPage implements OnInit {

  medicos: any = [];
  medicoSeleccionado: any;
  modoEdicion: boolean = false;
  isModalOpen = false;
  imageSeleccionada: any;

  nuevoMedico: any = {
    id: '',
    nombre: '',
    apellido: '',
    email: '',
    numero: '',
    especialidad: ''
  };


  @Output() medicosActualizados: EventEmitter<any> = new EventEmitter<any>();


  constructor(private http: HttpClient, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getMedicos().subscribe(res => {
      console.log("Datos Medicos", res)
      this.medicos = res;
    });
  }

  getMedicos() {
    return this.http
      .get("assets/files/datosMedicos.json")
      .pipe(
        map((res: any) => {
          return res.datMedic;
        })
      );
  }

  seleccionarMedico(medico: any) {
    this.medicoSeleccionado = { ...medico };
  }

  activarModoEdicion() {
    this.modoEdicion = true;
  }

  guardarCambios() {
    const index = this.medicos.findIndex((medico: { id: any; }) => medico.id === this.medicoSeleccionado.id);

    if (index !== -1) {
      this.medicos[index] = { ...this.medicoSeleccionado };
      this.medicosActualizados.emit(this.medicos);

      console.log('Datos actualizados:', this.medicos);

      this.modoEdicion = false;
    } else {
      console.error('Médico no encontrado en el array');
    }
  }

  eliminarMedico(medico: any) {
    this.medicos = this.medicos.filter((m: { id: any; }) => m.id !== medico.id);
    this.medicosActualizados.emit(this.medicos);

    console.log('Médico eliminado con éxito');
    console.log('Datos actualizados:', this.medicos);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      // Lee el archivo y conviértelo a una URL segura
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSeleccionada = this.domSanitizer.bypassSecurityTrustUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  // ...

  crearMedico() {
    // Crea un nuevo objeto médico con datos del formulario y la imagen seleccionada
    const nuevoMedico = {
      id: this.generarIdUnico(),
      nombre: this.nuevoMedico.nombre,
      apellido: this.nuevoMedico.apellido,
      email: this.nuevoMedico.email,
      numero: this.nuevoMedico.numero,
      especialidad: this.nuevoMedico.especialidad,
      image: this.imageSeleccionada // Usa la imagen seleccionada
      // Agrega más campos según tus necesidades
    };

    // Restablece la variable de la imagen después de usarla
    this.imageSeleccionada = null;

    // Agrega el nuevo médico al array de médicos
    this.medicos.push(nuevoMedico);

    // Emite un evento para notificar a otros componentes sobre la actualización
    this.medicosActualizados.emit(this.medicos);

    // Selecciona automáticamente el nuevo médico
    this.seleccionarMedico(nuevoMedico);

    console.log('Nuevo médico creado:', nuevoMedico);
    console.log('Datos actualizados:', this.medicos);
    this.setOpen(false);
  }


  generarIdUnico() {
    // Implementa tu propia lógica para generar un ID único (puedes usar un timestamp)
    return new Date().getTime().toString();
  }


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}
