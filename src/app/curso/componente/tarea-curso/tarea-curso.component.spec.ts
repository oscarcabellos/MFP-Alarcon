import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Usuario } from '../../modelo/usuario';

import { TareaCursoComponent } from './tarea-curso.component';

describe('TareaCursoComponent', () => {
  let component: TareaCursoComponent;
  let fixture: ComponentFixture<TareaCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [TareaCursoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Retorna el id del usuario', () => {
    expect(component.entregar(1)).toEqual(1);
  });
});
