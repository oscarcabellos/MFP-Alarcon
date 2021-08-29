export class Usuario {
  //clave primaria unica por usuario
  usuario_id: number;
  //nombre del usuario
  usuario_nombre: string;
  //apellido del usuario
  usuario_apellidos: string;
  //contraseña del usuario
  password: string;
  //correo del usuario
  correo: string;
  //url donde se guarda la imagen del usuario
  url: string;
  //identificador para ver la situacion del usuario
  situacion_id: number;
  //descripcion del usuario
  descripcion: string;
}
