export interface user {
    nombre: string;
    correo: string;
    rut: string;
    prevision: string;
    numero: string;
    password: string;
    uid: string;
    perfil: 'paciente' | 'admin' | 'medico' ,
}