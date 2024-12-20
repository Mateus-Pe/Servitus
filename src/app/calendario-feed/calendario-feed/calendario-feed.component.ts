import { Component } from '@angular/core';
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

  constructor(private getAgendaCalendarioFeedService: GetAgendaCalendarioFeedService,
              private utilsService: UtilsService
  ){}

  ngOnInit(): void{
    
  }

  //Serviços -------------------------------------------------------------------------------------
  getCalendarioAgendas(){
    this.getAgendaCalendarioFeedService.getAgendaCalendarioFeed(this.cidadeId, this.dateSelected).subscribe({
      next: (response) => {
        this.agendas = response.calendario_hora;
      },
      error: (error) => {
        console.error("Erro ao gerar as agendas: ", error);
      }
    })
  }

  //Funções ---------------------------------------------------------------------------------------
  onDateSelected(date: string): void {
    this.dateSelected = date;
    console.log('Data selecionada:', this.dateSelected);
    this.getCalendarioAgendas();
  }

  removeUf(cidade: string){
    return this.utilsService.removerUf(cidade);
  }

  formataHora(hora: string){
    return this.utilsService.timeFormat(hora, 'h', true);
  }
}
