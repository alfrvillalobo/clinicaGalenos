import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  nuevoMedicoForm: FormGroup;


  @Output() medicosActualizados: EventEmitter<any> = new EventEmitter<any>();


  constructor(private http: HttpClient, private domSanitizer: DomSanitizer, private formBuilder: FormBuilder) {
    this.nuevoMedicoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numero: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Permite solo números
      especialidad: ['', Validators.required]
    });
  }

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
    // Verifica si el formulario es válido
    if (this.nuevoMedicoForm.valid) {
      // Crea un nuevo objeto médico con datos del formulario y la imagen seleccionada
      const nuevoMedico = {
        id: this.generarIdUnico(),
        nombre: this.nuevoMedicoForm.value.nombre,
        apellido: this.nuevoMedicoForm.value.apellido,
        email: this.nuevoMedicoForm.value.email,
        numero: this.nuevoMedicoForm.value.numero,
        especialidad: this.nuevoMedicoForm.value.especialidad,
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

      // Cierra el modal después de crear el médico
      this.setOpen(false);

      // Reinicia el formulario
      this.nuevoMedicoForm.reset();
    } else {
      // Si el formulario no es válido, muestra un mensaje de error o realiza otras acciones según tus necesidades
      console.error('Formulario no válido. Por favor, complete todos los campos correctamente.');
    }
  }


  generarIdUnico() {
    // Implementa tu propia lógica para generar un ID único (puedes usar un timestamp)
    return new Date().getTime().toString();
  }


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}
