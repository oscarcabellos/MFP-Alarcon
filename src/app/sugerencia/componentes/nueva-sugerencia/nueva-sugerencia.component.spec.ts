import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { NuevaSugerenciaComponent } from './nueva-sugerencia.component';

describe('NuevaSugerenciaComponent', () => {
  let component: NuevaSugerenciaComponent;
  let fixture: ComponentFixture<NuevaSugerenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [NuevaSugerenciaComponent],
      providers: [NgbActiveModal, FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaSugerenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
