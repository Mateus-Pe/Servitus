import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscolhaTipoAgendaComponent } from './escolha-tipo-agenda.component';

describe('EscolhaTipoAgendaComponent', () => {
  let component: EscolhaTipoAgendaComponent;
  let fixture: ComponentFixture<EscolhaTipoAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscolhaTipoAgendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscolhaTipoAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
