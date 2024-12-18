import { Component, Output, Input, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { GetEventoByAgendaIdService } from '../../services/get-evento-by-agenda-id/get-evento-by-agenda-id.service';
import { UtilsService } from '../../utils/utils.service';

interface Evento {
  agenda: {
    agenda_dias_escolhidos: string;
    agenda_evento_id: string;
    agenda_id: string;
    agenda_igreja_id: string;
    agenda_img: string;
    agenda_layout: string | null;
    agenda_layout_id: string | null;
    agenda_layout_tipo: string;
    agenda_layout_upload_desc: string;
    agenda_lote: string;
    data_fim_fixo: string;
    data_inicio_evento: string;
    data_inicio_fixo: string;
    data_referencia: string;
    igreja_logo_url: string;
    igreja_nome: string;
  };
  eventos_igreja: Array<{
    agenda_horario: string;
    agenda_id: string;
    agenda_img: string;
    igreja_desc_resumida: string;
    igreja_nome: string;
  }>;
}

@Component({
  selector: 'app-modal-agenda',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './modal-agenda.component.html',
  styleUrl: './modal-agenda.component.scss'
})
export class ModalAgendaComponent {
  faArrowLeft = faArrowLeft;

  evento: Evento | null = null;

  @Output() closeModalEvent = new EventEmitter<void>();
  @Input() agendaId: number | null = null;

  constructor(private getEventoByAgendaIdService: GetEventoByAgendaIdService,
              private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    if (this.agendaId) {
      this.carregarAgenda(this.agendaId);
    }
  }

  carregarAgenda(agendaId: number) {
    this.getEventoByAgendaIdService.getEventoByAgendaId(agendaId).subscribe({
      next: (response) => {
        this.evento = response;
      },
      error: (error) => {
        console.error('Erro ao carregar a agenda:', error);
      }
    });
  }

  dataAgenda(evento: any): string {
    return this.utilsService.dateText(this.utilsService.splitDateTime(evento.agenda.data_inicio_evento).date);
  }
  
  dataAgendaEventos(evento: any): string {
    return this.utilsService.dateText(this.utilsService.splitDateTime(evento.agenda_horario).date);
  }
  
  horarioAgenda(evento: any): string {
    return this.utilsService.timeFormat(this.utilsService.splitDateTime(evento.agenda.data_inicio_evento).time, ':', true);
  }
  
  horarioAgendaEventos(evento: any): string {
    return this.utilsService.timeFormat(this.utilsService.splitDateTime(evento.agenda_horario).time, ':', true);
  }

  selectEvento(eventoId: any){
    this.carregarAgenda(eventoId);
  }

  closeModal(){
    this.closeModalEvent.emit();
  }
}
