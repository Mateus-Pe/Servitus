import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarDay, faXmark, faCheck, faHandsPraying, faPen, faHourglassStart, faHourglassEnd } from '@fortawesome/free-solid-svg-icons';
import { EventoAgendaService } from '../../services/evento-agenda/evento-agenda.service';
import { CalendarioUtilsComponent } from "../../calendario-utils/calendario-utils.component";
import { UtilsService } from '../../utils/utils.service';
import { ModalComponent } from '../../modal/modal/modal.component';
import { GerarAgendaEspecificaService } from '../../services/gerar-agenda-especifica/gerar-agenda-especifica.service';


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

  igrejaId: number | null = null;
/*----------------VAR FUNÇÕES-------------*/
  eventoSelectInput: string = ''
  
  divTextEvento: boolean = false;
  mostrarSelectEventos: boolean = false;
  atualEventoId: number | null = 0;
  showModalCalendario = false;
  showModalConfirmacao = false;
  

  textoConfirmacao = '';
  textEvento: string = '';
  dataEvento: string = '';
  selectEvento: string = '0';
  selectAgendaDe: string = '0';
  selectAgendaAte: string = '0';

  horarios: string[] = [
    '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
    '22:00', '22:30', '23:00'
  ];
/*---------------ESTILOS MODAL------------*/
estiloModalContent = {
  'width': '90%'
};

  constructor(private router: Router,
              private eventoAgendaService: EventoAgendaService,
              private gerarAgendaEspecificaService: GerarAgendaEspecificaService,
              private utilsService: UtilsService
  ){}

  ngOnInit() {
    const igrejaId = window.sessionStorage.getItem('igreja_id');
    this.igrejaId = igrejaId ? Number(igrejaId) : null;
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

  gerar_agenda_especifica(){
    const eventoOutro = this.pegarEvento();
    console.log(eventoOutro);
    this.gerarAgendaEspecificaService.gerarAgendaEspecifica(Number(this.igrejaId),
                                                            Number(this.atualEventoId),
                                                            eventoOutro,
                                                            this.dataEvento,
                                                            Number(this.utilsService.splitHourMinute(this.selectAgendaDe).hour),
                                                            Number(this.utilsService.splitHourMinute(this.selectAgendaDe).minute),
                                                            Number(this.utilsService.splitHourMinute(this.selectAgendaAte).hour),
                                                            Number(this.utilsService.splitHourMinute(this.selectAgendaAte).minute)

    ).subscribe({
      next: (response) => {
        if (response.status == 1){
          console.log('Agenda gerada com sucesso!', response);
          window.sessionStorage.setItem('agenda_id', response.agenda_id.toString());
          this.router.navigate(['/configurar-layout-upload']);
        }
      },
      error: (error) => {
        console.error('Erro ao gerar agenda:', error);
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
      this.selectEvento = '0';
    }
  };

  selectEventsInput(event: Event): void{
    const elementoSelecionado = event.target as HTMLSelectElement;
    this.eventoSelectInput = elementoSelecionado.value;
    if (this.eventoSelectInput == 'Outros') {
      this.divTextEvento = true;
    }else{
      this.divTextEvento = false;
      this.textEvento = '';
    }
    console.log('Valor selecionado do evento: ', this.selectEvento);
  };

  validacaoEvento(): void{
    var erro = false;
    this.textoConfirmacao = '';
    
    if (this.atualEventoId == 0){
      this.textoConfirmacao = 'Selecione o evento que deseja.';
      this.openModalConfirmacao();
      erro = true;
    }

    if (this.atualEventoId == 3 && (this.selectEvento == '0' || !this.selectEvento)){
      this.textoConfirmacao = 'Selecione qual será o evento.';
      console.log(this.selectEvento);
      this.openModalConfirmacao();
      erro = true;
    }

    if (this.selectEvento == 'Outros' && (!this.textEvento || this.textEvento.trim() === '')) {
      this.textoConfirmacao = 'Digite qual evento irá realizar.';
      this.openModalConfirmacao();
      erro = true;
    }

    if (!this.dataEvento || this.dataEvento.trim() == ''){
      this.textoConfirmacao = 'Selecione o dia que deseja agendar.';
      this.openModalConfirmacao();
      erro = true;
    }
    
    if (!this.selectAgendaDe || this.selectAgendaDe == '0' || this.selectAgendaDe == undefined){
      this.textoConfirmacao = 'Selecione quando o evento iniciará.';
      this.openModalConfirmacao();
      erro = true;
    }

    if (!this.selectAgendaAte || this.selectAgendaAte == '0' || this.selectAgendaAte == undefined){
      this.textoConfirmacao = 'Selecione quando o evento terminará.';
      this.openModalConfirmacao();
      erro = true;
    }

    if (this.selectAgendaDe && this.selectAgendaAte && this.selectAgendaDe >= this.selectAgendaAte){
      this.textoConfirmacao = 'A hora de início deve ser menor que a hora do fim.';
      this.openModalConfirmacao();
      erro = true;
    }

    if (!erro){
      this.gerar_agenda_especifica();
      
    }
  };

  pegarEvento(): string{
    var ret = '';

    if (this.atualEventoId == 3){
      if (this.selectEvento != '0' && this.selectEvento != 'Outros'){
        ret = this.selectEvento;
      } else if (this.selectEvento == 'Outros'){
        ret = this.textEvento;
      }
    }
    return ret;
  };

  onDaySelected(selectedDate: string): void {
    this.dataEvento = selectedDate;
    this.showModalCalendario = false;
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

  openModalCalendar(){
    this.showModalCalendario = true;
  };

  openModalConfirmacao(){
    this.showModalConfirmacao = true;
  }

  closeModalConfirmacao(){
    this.showModalConfirmacao = false;
  }

  closeModalCalendar(){
    this.showModalCalendario = false;
  };
}
