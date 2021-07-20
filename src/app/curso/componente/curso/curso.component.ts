import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../../servicios/curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})
export class CursoComponent implements OnInit {
  id: number;
  pertenece: boolean;
  usuarioId: number;
  constructor(
    private route: ActivatedRoute,
    private cursoService: CursoService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.usuarioId = +sessionStorage.getItem('usuario_id');
    this.obtenerCurso(this.id);
  }

  obtenerCurso(id) {
    this.cursoService.obtenerCurso(id).subscribe((x) => {
      this.pertenece = this.usuarioId === x['data']['usuario_id'];
    });
  }
}
