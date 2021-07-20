import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEntregaTareaComponent } from './ver-entrega-tarea.component';

describe('VerEntregaTareaComponent', () => {
  let component: VerEntregaTareaComponent;
  let fixture: ComponentFixture<VerEntregaTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerEntregaTareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerEntregaTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
