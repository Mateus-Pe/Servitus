import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarIgrejaComponent } from './loginas.component';

describe('AdministrarIgrejaComponent', () => {
  let component: AdministrarIgrejaComponent;
  let fixture: ComponentFixture<AdministrarIgrejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrarIgrejaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrarIgrejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
