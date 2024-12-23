import { Component, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioUtilsComponent } from '../../calendario-utils/calendario-utils.component';
import { GetAgendaCalendarioFeedService } from '../../services/get-agenda-calendario-feed/get-agenda-calendario-feed.service';
import { UtilsService } from '../../utils/utils.service';

@Component({
  selector: 'app-calendario-feed',
  standalone: true,
  imports: [CalendarioUtilsComponent, CommonModule],
  templateUrl: './calendario-feed.component.html',
  styleUrl: './calendario-feed.component.scss'
})
export class CalendarioFeedComponent {
  modoCalendario: 'mensal' | 'semanal' = 'semanal';
  dateSelected: string = '';
  cidadeId: number = 9240;

  agendas: any[] = [];
  filteredAgendas = [...this.agendas];
  selectedFilter: string = 'Todos';

  @ViewChild('divListaAgenda') divListaAgenda: ElementRef | undefined;

  constructor(private getAgendaCalendarioFeedService: GetAgendaCalendarioFeedService,
              private utilsService: UtilsService
  ){}

  ngOnInit(): void{
    
  }

  ngAfterViewInit(): void {
    // Verificar se a rolagem até a última agenda já passada deve ser feita
    this.scrollToLastPassedAgenda();
  }


  //Serviços -------------------------------------------------------------------------------------
  getCalendarioAgendas(){
    this.getAgendaCalendarioFeedService.getAgendaCalendarioFeed(this.cidadeId, this.dateSelected).subscribe({
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
    this.getCalendarioAgendas();
    this.selectedFilter = 'Todos';

    setTimeout(() => {
      this.scrollToLastPassedAgenda();
    }, 500);
  }

  eventoPassado(agenda: any): boolean {
    const arrHora = agenda.agenda_hora.split(":");
    const arrData = this.dateSelected.split("-");  // Usando a data selecionada pelo usuário
  
    // Criação de uma data completa para o evento com ano, mês, dia e hora
    const eventoData = new Date(
      parseInt(arrData[0]),   // Ano (data selecionada)
      parseInt(arrData[1]) - 1, // Mês (lembrando que o mês no JavaScript começa de 0)
      parseInt(arrData[2]),   // Dia (data selecionada)
      parseInt(arrHora[0]),   // Hora do evento
      parseInt(arrHora[1]),   // Minutos do evento
      0                       // Segundos
    );
  
    const dataAtual = new Date(); // Data e hora atuais
  
    return dataAtual > eventoData;  // Verifica se o evento já passou
  }

  scrollToLastPassedAgenda() {
    // Verifica se existem agendas para o dia selecionado
    if (this.filteredAgendas.length === 0) return;
  
    // Verifica se todos os eventos já passaram ou se todos são futuros
    const todosPassados = this.filteredAgendas.every((agenda) => this.eventoPassado(agenda));
    const todosFuturos = this.filteredAgendas.every((agenda) => !this.eventoPassado(agenda));
  
    // Se todos os eventos forem futuros, rola para o topo
    if (todosFuturos) {
      if (this.divListaAgenda) {
        // Rolagem suave para o topo da lista
        this.divListaAgenda.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    // Se todos os eventos forem passados, rola para o fim da lista
    else if (todosPassados) {
      if (this.divListaAgenda) {
        // Rolagem suave para o fim da lista
        this.divListaAgenda.nativeElement.scrollTo({ top: this.divListaAgenda.nativeElement.scrollHeight, behavior: 'smooth' });
      }
    }
    // Se houver mistura de eventos passados e futuros, rola até o último evento passado
    else {
      const lastPassedIndex = this.filteredAgendas
        .slice() // Faz uma cópia para evitar modificação da lista original
        .reverse() // Reverte para começar a busca do último evento
        .findIndex((agenda) => this.eventoPassado(agenda));
  
      if (lastPassedIndex !== -1 && this.divListaAgenda) {
        // Obtém o índice correto considerando a lista invertida
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
}
