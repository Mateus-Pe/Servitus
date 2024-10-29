import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarIgrejaComponent } from './criar-igreja.component';

describe('CriarIgrejaComponent', () => {
  let component: CriarIgrejaComponent;
  let fixture: ComponentFixture<CriarIgrejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarIgrejaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarIgrejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
