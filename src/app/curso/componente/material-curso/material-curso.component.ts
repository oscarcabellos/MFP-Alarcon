import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NuevoMaterialComponent } from '../nuevo-material/nuevo-material.component';

@Component({
  selector: 'app-material-curso',
  templateUrl: './material-curso.component.html',
  styleUrls: ['./material-curso.component.css'],
})
export class MaterialCursoComponent implements OnInit {
  @Input() usuarioProfesor: boolean;

  material = [1, 2, 3, 4, 5, 5];
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  openModal() {
    const modalRef = this.modalService.open(NuevoMaterialComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      size: 'lg',
    });
    let data = {};
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {},
      (reason) => {}
    );
  }
}
