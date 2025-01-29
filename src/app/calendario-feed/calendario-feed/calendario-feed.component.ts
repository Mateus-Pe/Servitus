import { Component, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioUtilsComponent } from '../../calendario-utils/calendario-utils.component';
import { GetAgendaCalendarioFeedService } from '../../services/get-agenda-calendario-feed/get-agenda-calendario-feed.service';
import { UtilsService } from '../../utils/utils.service';
import { ModalAgendaComponent } from '../../modal-agenda/modal-agenda/modal-agenda.component';

@Component({
  selector: 'app-calendario-feed',
  standalone: true,
  imports: [CalendarioUtilsComponent, CommonModule, ModalAgendaComponent],
  templateUrl: './calendario-feed.component.html',
  styleUrl: './calendario-feed.component.scss'
})
export class CalendarioFeedComponent {
  modoCalendario: 'mensal' | 'semanal' = 'semanal';
  dateSelected: string = '';
  dateSelectedModal: Date | null = null;
  diaModalFormatado: string = '';
  cidadeId: number = 9240;

  modalAgendas = false;

  agendas: any[] = [];
  agendaSelecionadaId: number | null = null;
  filteredAgendas = [...this.agendas];
  selectedFilter: string = 'Todos';

  ativarModalCalendario = true;

  @ViewChild('divListaAgenda') divListaAgenda: ElementRef | undefined;

  constructor(private getAgendaCalendarioFeedService: GetAgendaCalendarioFeedService,
              private utilsService: UtilsService,
  ){}

  ngOnInit(): void{
    
  }

  ngAfterViewInit(): void {
    this.scrollToLastPassedAgenda();
  }


  //Serviços -------------------------------------------------------------------------------------
  getCalendarioAgendas(dataSelecionada: string){
    this.getAgendaCalendarioFeedService.getAgendaCalendarioFeed(this.cidadeId, dataSelecionada).subscribe({
      next: (response) => {
        this.agendas = response.calendario_hora;
        this.filteredAgendas = [...this.agendas];
        this.scrollToLastPassedAgenda();
      },
      error: (error) => {
        console.error("Erro ao gerar as agendas: ", error);
      }
    })
  }

  //Funções ---------------------------------------------------------------------------------------

  filtroLista(filtro: string){
    this.selectedFilter = filtro;
    if (filtro === 'Todos') {
      this.filteredAgendas = [...this.agendas];
      setTimeout(() => {
        this.scrollToLastPassedAgenda();
      }, 100);
    } else {
      this.filteredAgendas = this.agendas.filter(agenda => agenda.evento_nome === filtro); 
      setTimeout(() => {
        this.scrollToLastPassedAgenda();
      }, 100);
    }
  }

  onDateSelected(date: string): void {
    this.dateSelected = date;
    console.log(this.dateSelected);
    this.getCalendarioAgendas(this.dateSelected);
    this.selectedFilter = 'Todos';

    setTimeout(() => {
      this.scrollToLastPassedAgenda();
    }, 500);
  }

  onDateSelectedModal(date: Date): void {
    this.dateSelectedModal = date;
    this.diaModalFormatado = this.utilsService.formatData(this.dateSelectedModal);
    console.log(this.diaModalFormatado);
    this.getCalendarioAgendas(this.diaModalFormatado);
    this.selectedFilter = 'Todos';

    setTimeout(() => {
      this.scrollToLastPassedAgenda();
    }, 500);
  }

  eventoPassado(agenda: any): boolean {
    const arrHora = agenda.agenda_hora.split(":");
    const arrData = this.dateSelectedModal ? this.diaModalFormatado.split("-") : this.dateSelected.split("-");
  
    const eventoData = new Date(
      parseInt(arrData[0]),   // Ano
      parseInt(arrData[1]) - 1, // Mês (começa de 0)
      parseInt(arrData[2]),   // Dia
      parseInt(arrHora[0]),   // Hora do evento
      parseInt(arrHora[1]),   // Minutos do evento
      0                       // Segundos
    );
    const dataAtual = new Date();
  
    return dataAtual > eventoData;
  }

  scrollToLastPassedAgenda() {
    if (this.filteredAgendas.length === 0) return;
  
    const todosPassados = this.filteredAgendas.every((agenda) => this.eventoPassado(agenda));
    const todosFuturos = this.filteredAgendas.every((agenda) => !this.eventoPassado(agenda));
  
    if (todosFuturos) {
      if (this.divListaAgenda) {
        this.divListaAgenda.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    else if (todosPassados) {
      if (this.divListaAgenda) {
        this.divListaAgenda.nativeElement.scrollTo({ top: this.divListaAgenda.nativeElement.scrollHeight, behavior: 'smooth' });
      }
    }
    else {
      const lastPassedIndex = this.filteredAgendas
        .slice()
        .reverse()
        .findIndex((agenda) => this.eventoPassado(agenda));
  
      if (lastPassedIndex !== -1 && this.divListaAgenda) {
        const realIndex = this.filteredAgendas.length - 1 - lastPassedIndex;
        const agendaElement = this.divListaAgenda.nativeElement.children[realIndex];
  
        if (agendaElement) {
          agendaElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }

  removeUf(cidade: string){
    return this.utilsService.removerUf(cidade);
  }

  formataHora(hora: string){
    return this.utilsService.timeFormat(hora, 'h', true);
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
}
