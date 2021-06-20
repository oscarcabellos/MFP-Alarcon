import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoPublicoComponent } from './curso-publico.component';

describe('CursoPublicoComponent', () => {
  let component: CursoPublicoComponent;
  let fixture: ComponentFixture<CursoPublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoPublicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
