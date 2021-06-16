import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSugerenciasComponent } from './listar-sugerencias.component';

describe('ListarSugerenciasComponent', () => {
  let component: ListarSugerenciasComponent;
  let fixture: ComponentFixture<ListarSugerenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSugerenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSugerenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
