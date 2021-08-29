export class Curso {
  //clave primaria por curso
  curso_id: number;
  //clave primaria por usuario
  usuario_id: number;
  //codigo del curso generado cuando se cree el curso
  codigo: string;
  //calve primaria por categoria
  categoria_id: any;
  //nombre del curso
  curso_nombre: string;
  //descripcion del curso
  descripcion: string;
  //conocimiento previo apra el curso
  conoci_previo: string;
  //clave primaria por privacidad
  privacidad_id: number;
  //url donde se guarda la imagen del curso
  imagen: string;
}
