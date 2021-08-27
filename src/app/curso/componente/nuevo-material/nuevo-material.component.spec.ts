import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tarea } from '../../modelo/tarea';
import { NuevoMaterialService } from '../../servicios/nuevo-material.service';
import { TareaService } from '../../servicios/tarea.service';

import { NuevoMaterialComponent } from './nuevo-material.component';

describe('NuevoMaterialComponent', () => {
  let component: NuevoMaterialComponent;
  let fixture: ComponentFixture<NuevoMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [NuevoMaterialComponent],
      providers: [
        NgbActiveModal,
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Añadir material', () => {
    let event = {
      target: {
        files: ['nuevo', 'archivo'],
      },
    };
    component.subirArvhivos(event);
    expect(component.archivos.length).toEqual(1);
  });

  it('Eliminar material', () => {
    let event = {
      target: {
        files: ['nuevo', 'archivo'],
      },
    };
    component.subirArvhivos(event);
    component.subirArvhivos(event);
    component.eliminarArchivo(1);
    expect(component.archivos.length).toEqual(1);
  });

  it('cerrar modal', () => {
    component.closeModal('close');
  });

  it('comprobar tipo material', () => {
    component.tarea = true;
    component.comprobarTipoMaterial();
  });

  it('comprobar tipo material', () => {
    component.tarea = false;
    component.comprobarTipoMaterial();
  });

  it('cargar datos tarea', () => {
    let tareaTest = new Tarea();
    component.cargarDatosTarea(tareaTest);
  });

  it('Actualizar tarea', () => {
    component.actualizarTarea();
  });
});
