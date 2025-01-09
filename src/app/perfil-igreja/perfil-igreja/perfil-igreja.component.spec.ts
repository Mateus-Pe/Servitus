import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilIgrejaComponent } from './perfil-igreja.component';

describe('PerfilIgrejaComponent', () => {
  let component: PerfilIgrejaComponent;
  let fixture: ComponentFixture<PerfilIgrejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilIgrejaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilIgrejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
