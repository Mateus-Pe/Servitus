import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarAgendaEspecificaComponent } from './criar-agenda-especifica.component';

describe('CriarAgendaEspecificaComponent', () => {
  let component: CriarAgendaEspecificaComponent;
  let fixture: ComponentFixture<CriarAgendaEspecificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarAgendaEspecificaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarAgendaEspecificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
