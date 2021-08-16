import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPaginationModule } from 'ngx-pagination';

import { ListaSugerenciaComponent } from './lista-sugerencia.component';

describe('ListaSugerenciaComponent', () => {
  let component: ListaSugerenciaComponent;
  let fixture: ComponentFixture<ListaSugerenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaSugerenciaComponent ],
      imports:[HttpClientModule,
        NgxPaginationModule]
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
