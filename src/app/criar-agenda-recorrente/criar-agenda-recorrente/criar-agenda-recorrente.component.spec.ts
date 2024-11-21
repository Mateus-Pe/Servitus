import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarAgendaRecorrenteComponent } from './criar-agenda-recorrente.component';

describe('CriarAgendaRecorrenteComponent', () => {
  let component: CriarAgendaRecorrenteComponent;
  let fixture: ComponentFixture<CriarAgendaRecorrenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarAgendaRecorrenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarAgendaRecorrenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
