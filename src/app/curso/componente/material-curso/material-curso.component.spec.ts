import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCursoComponent } from './material-curso.component';

describe('MaterialCursoComponent', () => {
  let component: MaterialCursoComponent;
  let fixture: ComponentFixture<MaterialCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
