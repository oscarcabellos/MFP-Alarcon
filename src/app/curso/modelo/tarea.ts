export class Tarea {
  //clave primaria unica por tarea
  tarea_id: number;
  //nombre de la tarea
  nombre: string;
  //descripcion de la tarea
  descripcion: string;
  //fecha de creacion de la tarea
  fecha_creacion: Date;
  //clave priamria unica por curso
  curso_id: number;
  //fecha maxima para la entrega de tarea 
  tarea_fecha_entrega: Date;
}
