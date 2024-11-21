import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar, faXmark, faCheck, faHandsPraying, faPen, faClock, faHourglassStart, faHourglassEnd } from '@fortawesome/free-solid-svg-icons';
import { EventoAgendaService } from '../../services/evento-agenda/evento-agenda.service';
import { UtilsService } from '../../utils/utils.service';

interface Evento {
  evento_id: number;
  evento_nome: string;
  evento_icone_img: string;
}

@Component({
  selector: 'app-criar-agenda-recorrente',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './criar-agenda-recorrente.component.html',
  styleUrl: './criar-agenda-recorrente.component.scss'
})
export class CriarAgendaRecorrenteComponent {
  faXmark = faXmark;
  faCheck = faCheck;
  faHandsPraying = faHandsPraying;
  faPen = faPen;
  faCalendar = faCalendar;
  faClock = faClock;
  faHourglassStart = faHourglassStart;
  faHourglassEnd = faHourglassEnd;

  listaEventosAgenda: Evento[] = [];

  diasSemana = [
    { nome: 'SEGUNDA-FEIRA', valor: 1, checked: true },
    { nome: 'TERÇA-FEIRA', valor: 2, checked: false },
    { nome: 'QUARTA-FEIRA', valor: 3, checked: false },
    { nome: 'QUINTA-FEIRA', valor: 4, checked: false },
    { nome: 'SEXTA-FEIRA', valor: 5, checked: false },
    { nome: 'SÁBADO', valor: 6, checked: true },
    { nome: 'DOMINGO', valor: 0, checked: true },
  ];

  horarios: string[] = [
    '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
    '22:00', '22:30', '23:00'
  ];

  divTextEvento: boolean = false;
  mostrarSelectEventos: boolean = false;
  atualEventoId: number | null = 0;
  eventoSelectInput: string = '';
  textEvento: string = '';
  selectEvento: string = '0';
  selectAgendaDe: string = '0';
  selectAgendaAte: string = '0';

  constructor(private eventoAgendaService: EventoAgendaService,
              private utilsService: UtilsService,
              private router: Router){}

  ngOnInit(){
    this.evento_agenda();
  }

/*---------------------------------------------------SERVIÇOS-------------------------------------------*/
  evento_agenda(){
    this.eventoAgendaService.getEventoAgenda().subscribe({
      next: (response) => {
        this.listaEventosAgenda = response.lista_evento_agenda;
      },
      error: (error) => {
        console.error('Nenhum resultado encontrado.', error);
      }
    })
  };


/*---------------------------------------------------FUNÇÕES-------------------------------------------*/
  selecionarEvento(evento: Evento): void {
    this.atualEventoId = evento.evento_id;
    if (this.atualEventoId == 3) {
      this.mostrarSelectEventos = true;
    } else {
      this.mostrarSelectEventos = false;
      this.eventoSelectInput = '';
      this.divTextEvento = false;
      this.textEvento = '';
      this.selectEvento = '0';
    }
  };

  selectEventsInput(event: Event): void{
    const elementoSelecionado = event.target as HTMLSelectElement;
    this.eventoSelectInput = elementoSelecionado.value;
    if (this.eventoSelectInput == 'Outros') {
      this.divTextEvento = true;
      console.log(this.eventoSelectInput);
    }else{
      console.log(this.eventoSelectInput);
      this.divTextEvento = false;
      this.textEvento = '';
    }
    console.log('Valor selecionado do evento: ', this.selectEvento);
  };

  autoCompleteAgendaDeAte(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    const currentIndex = this.horarios.indexOf(selectedValue);

    if (currentIndex !== -1 && currentIndex + 2 < this.horarios.length) {
      this.selectAgendaAte = this.horarios[currentIndex + 2];
    } else {
      this.selectAgendaAte = '0';
    }
  };

  voltarCalendario(){
    this.router.navigate(['/calendario']);
  };
}
