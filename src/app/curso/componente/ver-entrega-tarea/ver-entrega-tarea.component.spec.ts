import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { VerEntregaTareaComponent } from './ver-entrega-tarea.component';

describe('VerEntregaTareaComponent', () => {
  let component: VerEntregaTareaComponent;
  let fixture: ComponentFixture<VerEntregaTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerEntregaTareaComponent ],
      providers: [NgbActiveModal, { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); }}]
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
