import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar, faXmark, faCheck, faHandsPraying, faPen, faClock, faHourglassStart, faHourglassEnd } from '@fortawesome/free-solid-svg-icons';
import { EventoAgendaService } from '../../services/evento-agenda/evento-agenda.service';
import { UtilsService } from '../../utils/utils.service';
import { ModalComponent } from '../../modal/modal/modal.component';
import { GerarAgendaService } from '../../services/gerar-agenda/gerar-agenda.service';

interface Evento {
  evento_id: number;
  evento_nome: string;
  evento_icone_img: string;
}

@Component({
  selector: 'app-criar-agenda-recorrente',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule, ModalComponent],
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
    { nome: 'SEGUNDA-FEIRA', name_small: 'Seg', valor: 1, checked: true },
    { nome: 'TERÇA-FEIRA', name_small: 'Ter', valor: 2, checked: false },
    { nome: 'QUARTA-FEIRA', name_small: 'Qua', valor: 3, checked: false },
    { nome: 'QUINTA-FEIRA', name_small: 'Qui', valor: 4, checked: false },
    { nome: 'SEXTA-FEIRA', name_small: 'Sex', valor: 5, checked: false },
    { nome: 'SÁBADO', name_small: 'Sab', valor: 6, checked: true },
    { nome: 'DOMINGO', name_small: 'Dom', valor: 0, checked: true },
  ];

  horarios: string[] = [
    '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
    '22:00', '22:30', '23:00'
  ];

  igrejaId: number | null = null;
  divTextEvento: boolean = false;
  mostrarSelectEventos: boolean = false;
  showDivLista: boolean = true;
  atualEventoId: number | null = 0;
  eventoSelectInput: string = '';
  textEvento: string = '';
  selectEvento: string = '0';
  selectAgendaDe: string = '0';
  selectAgendaAte: string = '0';
  agendaDias: number | null = 0;
  tempoDuracao: number | null = 0;
  textoConfirmacao = '';

  showModalConfirmacao = false;

  diasSelecionados: string[] = [];

  constructor(private eventoAgendaService: EventoAgendaService,
              private utilsService: UtilsService,
              private gerarAgendaService: GerarAgendaService,
              private router: Router){}

  ngOnInit(){
    const igrejaId = window.sessionStorage.getItem('igreja_id');
    this.igrejaId = igrejaId ? Number(igrejaId) : null;
    this.evento_agenda();
    this.atualizarDiasSelecionados();
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

  gerarAgenda(){
    const eventoOutro = this.pegarEvento();
    const dias = this.diasSemana
    .filter(dia => dia.checked)
    .map(dia => dia.valor)
    .join(',');
    this.gerarAgendaService.getGerarAgenda(dias,
                                           Number(this.igrejaId),
                                           Number(this.atualEventoId),
                                           eventoOutro,
                                           Number(this.agendaDias),
                                           Number(this.tempoDuracao),
                                           this.selectAgendaDe,
                                           this.selectAgendaAte,
                                           Number(this.utilsService.splitHourMinute(this.selectAgendaDe).hour),
                                           Number(this.utilsService.splitHourMinute(this.selectAgendaDe).minute),
                                           Number(this.utilsService.splitHourMinute(this.selectAgendaAte).hour),
                                           Number(this.utilsService.splitHourMinute(this.selectAgendaAte).minute)

    ).subscribe({
      next: (response) => {
        if (response.status == 1) {
          sessionStorage.setItem('agenda_id', response.agenda_id);
          //this.router.navigate(['/configurar-layout-upload']);
        } else {
          this.mostrarMensagemErro('Nenhum evento criado, os dias da semana não batem com os dias a serem gerados.');
        }
      },
      error: (error) => {
        console.error('Erro ao gerar a agenda:', error);
      }
    })
  }

/*---------------------------------------------------FUNÇÕES-------------------------------------------*/
  validacaoEventoAgenda(): void {
    var erro = false

    if (this.selectAgendaAte == '0'){
      this.mostrarMensagemErro('Selecione quando o evento terminará.');
      erro = true;
    }

    if (this.selectAgendaDe == '0'){
      this.mostrarMensagemErro('Selecione quando o evento iniciará.');
      erro = true;
    }

    if (this.selectAgendaDe >= this.selectAgendaAte){
      this.mostrarMensagemErro('A hora de início deve ser menor que a hora do fim.');
      erro = true;
    }

    if (this.tempoDuracao == 0){
      this.mostrarMensagemErro('Selecione o tempo de duração do evento.');
      erro = true;
    }

    if (this.agendaDias == 0){
      this.mostrarMensagemErro('Selecione para quais dias deseja agendar.');
      erro = true;
    }

    if (this.diasSelecionados.length == 0) {
      this.mostrarMensagemErro('Selecione o(s) dia(s) que deseja agendar.');
      erro = true;
    }

    if (this.atualEventoId == 0){
      this.mostrarMensagemErro('Selecione o evento que deseja.');
      erro = true;
    }

    if (this.atualEventoId == 3){
      if (this.selectEvento == '0'){
        this.mostrarMensagemErro('Selecione o evento que irá realizar.');
        erro = true;
      }

      if (this.selectEvento == 'Outros' && this.textEvento == ''){
        this.mostrarMensagemErro('Digite qual evento irá realizar.');
        erro = true;
      }
    }

    if (!erro){
      this.gerarAgenda()
    }
  }

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

  autoCompleteAgendaDeAte(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    const currentIndex = this.horarios.indexOf(selectedValue);

    if (currentIndex !== -1 && currentIndex + 2 < this.horarios.length) {
      this.selectAgendaAte = this.horarios[currentIndex + 2];
    } else {
      this.selectAgendaAte = '0';
    }
  };

  atualizarDiasSelecionados(): void {
    this.diasSelecionados = this.diasSemana
      .filter(dia => dia.checked)
      .map(dia => dia.name_small);
  
    if (this.diasSelecionados.length === 0) {
      this.mostrarMensagemErro("Selecione ao menos 1 dia da semana.");
    }
  };

  mostrarMensagemErro(texto: string): void {
    // Substitua por sua lógica de modal ou mensagem de erro
    this.textoConfirmacao = texto;
    this.openModalConfirmacao();
  };

  showHideDivLista(): void {
    this.showDivLista = !this.showDivLista;
  };

  hideDivLista():void {
    this.showDivLista = false;
  };

  getEventoClasses(evento: Evento): string {
    return this.atualEventoId === evento.evento_id ? 'perfil_ec_selected eventos_select divPerfilEC' : 'eventos_select divPerfilEC';
  };

  voltarCalendario(){
    this.router.navigate(['/calendario']);
  };

  openModalConfirmacao(){
    this.showModalConfirmacao = true;
  }

  closeModalConfirmacao(){
    this.showModalConfirmacao = false;
  }
}
