import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSugerenciaComponent } from './lista-sugerencia.component';

describe('ListaSugerenciaComponent', () => {
  let component: ListaSugerenciaComponent;
  let fixture: ComponentFixture<ListaSugerenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaSugerenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSugerenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
