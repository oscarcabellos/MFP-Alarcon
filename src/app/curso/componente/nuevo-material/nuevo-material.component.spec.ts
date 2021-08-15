import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { NuevoMaterialComponent } from './nuevo-material.component';

describe('NuevoMaterialComponent', () => {
  let component: NuevoMaterialComponent;
  let fixture: ComponentFixture<NuevoMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoMaterialComponent ],
      providers: [NgbActiveModal, { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); }}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
