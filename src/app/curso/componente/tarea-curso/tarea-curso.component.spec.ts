import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaCursoComponent } from './tarea-curso.component';

describe('TareaCursoComponent', () => {
  let component: TareaCursoComponent;
  let fixture: ComponentFixture<TareaCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareaCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
