import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarDay, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { EventoAgendaService } from '../../services/evento-agenda/evento-agenda.service';


interface Evento {
  evento_id: number;
  evento_nome: string;
  evento_icone_img: string;
}

interface EventoAgendaResponse {
  lista_evento_agenda: Evento[];
}

@Component({
  selector: 'app-criar-agenda-especifica',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, CommonModule],
  templateUrl: './criar-agenda-especifica.component.html',
  styleUrl: './criar-agenda-especifica.component.scss'
})
export class CriarAgendaEspecificaComponent {
  faXmark = faXmark;
  faCheck = faCheck;
  faCalendarDay = faCalendarDay;

  listaEventosAgenda: Evento[] = [];

  constructor(private router: Router,
              private eventoAgendaService: EventoAgendaService
  ){}

  ngOnInit() {
    this.evento_agenda();
  }

  evento_agenda(){
    this.eventoAgendaService.getEventoAgenda().subscribe({
      next: (response) => {
        this.listaEventosAgenda = response.lista_evento_agenda;
        console.log(response);
        console.log(this.listaEventosAgenda);
      },
      error: (error) => {
        console.error('Nenhum resultado encontrado.', error);
      }
    })
  }
}
