import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarPerfilIgrejaComponent } from './configurar-perfil-igreja.component';

describe('ConfigurarPerfilIgrejaComponent', () => {
  let component: ConfigurarPerfilIgrejaComponent;
  let fixture: ComponentFixture<ConfigurarPerfilIgrejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurarPerfilIgrejaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurarPerfilIgrejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
