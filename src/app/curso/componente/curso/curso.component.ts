/**
 * Se importa el Componente y OnInit desde el core de angular
 */
import { Component, OnInit } from '@angular/core';

/**
 *Se importa ActivatedRoute desde angualar para el manejo de rutas
 */
import { ActivatedRoute } from '@angular/router';

/**
 * Se importa el servicio de cursos
 */
import { CursoService } from '../../servicios/curso.service';

/**
 * Declaracion del componente curso y la relacion con los archivos respectivos
 */
@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})

/**
 * Componente para visualizar un curso con el detalle respectivo para permitir la interaccion con los demas modulos
 */
export class CursoComponent implements OnInit {
  /**
   * Identificadore del curso que se va a mostrar información y detallar los campos necesarios para su vallidación
   */
  idCurso: number;

  /**
   * Variable para definir si el curso actual pertenece al usuario que se a kogeado en la pagina
   */
  pertenece: boolean;

  /**
   * Identificador del usuario que se ha registrado en el sistema
   */
  usuarioId: number;

  /**
   * Variable para definir el nombre del curso actual y se pueda mostrar en la información del curso
   */
  nombreCurso: string;

  /**
   * Constructor del componente para inicializar las funciones o valriables necesarios
   * @param route Servicio para manejar las rutas estaticas dentro de la pagina
   * @param cursoService Servicio para acceder a las funcionalidades de  los cursos y su persistencia en la base de datos
   */
  constructor(
    private readonly route: ActivatedRoute,
    private readonly cursoService: CursoService
  ) {}

  /**
   * Función que se ejecuta al principio de la incialización del componente
   */
  ngOnInit(): void {
    /**
     * Se obtiene el id del curso desde la ruta
     */
    this.idCurso = +this.route?.snapshot?.paramMap?.get('idcurso');

    /**
     * Se almacena el valor del curso en localstorage
     */
    localStorage.setItem('idcurso', String(this.idCurso));

    /**
     * Se obtiene el identificador del usuario desde las variables de sesion
     */
    this.usuarioId = +sessionStorage?.getItem('usuario_id');

    /**
     * Se llama a la función para obtener la información de un curso a partir del id que se obtuvo desde la ruta
     */
    this.obtenerCurso(this.idCurso);

    /**
     * Se determina si el curso actual pertenece al usuario que se ha logeado
     */
    this.pertenece =
      this.usuarioId === +this.route?.snapshot?.paramMap?.get('iduser');
  }

  /**
   * Función para obtener la información del curso
   * @param id {Number} - Identificador del curso
   */
  obtenerCurso(id: number) {
    /**
     * Se invoca al metodo del servicio para obtener la información
     */
    this.cursoService.obtenerCurso(id).subscribe((x) => {
      /**
       * Se almacena el nombre del curso desde la respuesta obtenida del servicio
       */
      this.nombreCurso = x['data']?.curso_nombre;
    });
  }
}
