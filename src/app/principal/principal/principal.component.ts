import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faMagnifyingGlass, faCalendarWeek, faList } from '@fortawesome/free-solid-svg-icons';
import { ModalAgendaComponent } from '../../modal-agenda/modal-agenda/modal-agenda.component';
import { UtilsService } from '../../utils/utils.service';
import { GetEventosPrincipalService } from '../../services/get_eventos_principal/get-eventos-principal.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ModalAgendaComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {
  faLocationDot = faLocationDot;
  faMagnifyingGlass = faMagnifyingGlass;
  faCalendarWeek = faCalendarWeek;
  faList = faList;

  eventos: any[] = [];

  cidadeId: number | null = null;
  cidadeNome = '';

  agendaSelecionadaId: number | null = null;

  modalAgendas = false;

  constructor(private getEventosPrincipalService: GetEventosPrincipalService,
              private utilsService: UtilsService,
              private router: Router){};

  ngOnInit(): void{
    const cidadeIdString = window.sessionStorage.getItem('cidade_id');
    //this.cidadeId = cidadeIdString ? parseInt(cidadeIdString, 10) : null;
    //this.cidadeNome = sessionStorage.getItem('cidade_nome') || '';

    if (!this.cidadeId || !this.cidadeNome) {
      this.cidadeNome = 'Selecione uma cidade';
    }

    this.eventosPrincipal();
  }

  eventosPrincipal(){
    this.getEventosPrincipalService.gerarEventos().subscribe({
      next: (response) => {
        this.eventos = response.eventos_agenda_principal;
      },
      error: (error) => {
        console.error('Erro ao carregar eventos:', error);
      }
    });
  }

  dataAgenda(agenda: any): string{
    return this.utilsService.dateText(this.utilsService.splitDateTime(agenda.agenda_horario).date);
  }

  horarioAgenda(agenda: any): string{
    return this.utilsService.timeFormat(this.utilsService.splitDateTime(agenda.agenda_horario).time, ':', true);
  }

  selecionarAgenda(agenda: any): void {
    this.agendaSelecionadaId = agenda.agenda_id;
    this.openModalAgendas();
  }

  openModalAgendas(){
    this.modalAgendas = true;
  }

  colseModalAgendas(){
    this.modalAgendas = false;
  }

  moveToCalendar(){
    this.router.navigate(['/calendario-feed']);
  }
}
