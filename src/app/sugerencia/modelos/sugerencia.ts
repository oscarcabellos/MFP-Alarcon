export class Sugerencia {
  //clave primaria unica por sugerencia
  sugerencia_id: number;
  //clave primaria unica por categoria
  categoria_id: number;
  //nombre de la sugerencia relacionada con el curso
  sugerencia_nombre_curso: string;
  //Puntuacion de la sugerencia con el respectivo curso
  sugerencia_puntuacion_curso: number;
  //el numero de votos
  numero_votos: number;
  //El estado en que se encuentra la sugerencia
  sugerencia_estado: string;
  //descripcion de la sugerencia
  descripcion: string;
  //fecha de la creacion de la sugerencia
  sugerencia_fecha_creacion: Date;
}
