import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarDay, faXmark, faCheck, faHandsPraying, faPen, faHourglassStart, faHourglassEnd } from '@fortawesome/free-solid-svg-icons';
import { EventoAgendaService } from '../../services/evento-agenda/evento-agenda.service';
import { CalendarioUtilsComponent } from "../../calendario-utils/calendario-utils.component";
import { ModalComponent } from '../../modal/modal/modal.component';


interface Evento {
  evento_id: number;
  evento_nome: string;
  evento_icone_img: string;
}

@Component({
  selector: 'app-criar-agenda-especifica',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, CommonModule, CalendarioUtilsComponent, ModalComponent],
  templateUrl: './criar-agenda-especifica.component.html',
  styleUrl: './criar-agenda-especifica.component.scss'
})
export class CriarAgendaEspecificaComponent {

  /*----------------VAR ICONS-------------*/
  faXmark = faXmark;
  faCheck = faCheck;
  faCalendarDay = faCalendarDay;
  faHandsPraying = faHandsPraying;
  faPen = faPen;
  faHourglassStart = faHourglassStart;
  faHourglassEnd = faHourglassEnd;
/*----------------VAR SERVICES------------*/
  listaEventosAgenda: Evento[] = [];
/*----------------VAR FUNÇÕES-------------*/
  eventoSelectInput: string = ''
  textEvento: string = '';
  divTextEvento: boolean = false;
  mostrarSelectEventos: boolean = false;
  atualEventoId: number | null = null;
  showModalCalendario = false;
/*---------------ESTILOS MODAL------------*/
estiloModalContent = {
  'width': '90%'
};

  constructor(private router: Router,
              private eventoAgendaService: EventoAgendaService
  ){}

  ngOnInit() {
    this.evento_agenda();
  }
/* -------------------------------------------------SERVIÇOS--------------------------------------------*/
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


  /*-------------------------------------------------FUNÇÕES-------------------------------------------*/

  selecionarEvento(evento: Evento): void {
    this.atualEventoId = evento.evento_id;
    if (this.atualEventoId == 3) {
      this.mostrarSelectEventos = true;
    } else {
      this.mostrarSelectEventos = false;
      this.eventoSelectInput = '';
      this.divTextEvento = false;
      this.textEvento = '';
    }
  }

  selectEventsInput(event: Event): void{
    const elementoSelecionado = event.target as HTMLSelectElement;
    this.eventoSelectInput = elementoSelecionado.value;
    if (this.eventoSelectInput == 'Outros') {
      this.divTextEvento = true;
    }else{
      this.divTextEvento = false;
      this.textEvento = '';
    }
  }

  openModalCalendar(){
    this.showModalCalendario = true;
  }

  closeModalCalendar(){
    this.showModalCalendario = false;
  }
}
