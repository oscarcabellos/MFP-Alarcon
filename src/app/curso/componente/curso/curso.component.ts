import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../../servicios/curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})
export class CursoComponent implements OnInit {
  idCurso: number;
  pertenece: boolean;
  usuarioId: number;
  nombreCurso: string;
  constructor(
    private route: ActivatedRoute,
    private cursoService: CursoService
  ) {}

  ngOnInit(): void {
    this.idCurso = +this.route.snapshot.paramMap.get('idcurso');
    this.usuarioId = +sessionStorage.getItem('usuario_id');
    this.obtenerCurso(this.idCurso);
    this.pertenece =
      this.usuarioId === +this.route.snapshot.paramMap.get('iduser');
  }
  /**
   * Método para obtener la información del curso
   * @param id {Number} - Identificador del curso
   */
  obtenerCurso(id: number) {
    this.cursoService.obtenerCurso(id).subscribe((x) => {
      this.nombreCurso = x['data']?.curso_nombre;
    });
  }
}
