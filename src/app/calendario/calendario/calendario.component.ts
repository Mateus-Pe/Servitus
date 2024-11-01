import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { GetAgendaCalendarioService } from '../../services/get-agenda-calendario/get-agenda-calendario.service';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent implements OnInit {
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faPlus = faPlus;

  year: number;
  month: number;
  daysInMonth: number[] = [];
  firstDay: number = 0;
  monthName: string = '';
  igrejaId: number | null = null;
  selectedDay: number | null = null;

  months = [
    { 'id': 1, 'name': 'Janeiro', 'name_small' : 'JAN' },
    { 'id': 2, 'name': 'Fevereiro', 'name_small' : 'FEV' },
    { 'id': 3, 'name': 'Março', 'name_small' : 'MAR' },
    { 'id': 4, 'name': 'Abril', 'name_small' : 'ABR' },
    { 'id': 5, 'name': 'Maio', 'name_small' : 'MAI' },
    { 'id': 6, 'name': 'Junho', 'name_small' : 'JUN' },
    { 'id': 7, 'name': 'Julho', 'name_small' : 'JUL' },
    { 'id': 8, 'name': 'Agosto', 'name_small' : 'AGO' },
    { 'id': 9, 'name': 'Setembro', 'name_small' : 'SET' },
    { 'id': 10, 'name': 'Outubro', 'name_small' : 'OUT' },
    { 'id': 11, 'name': 'Novembro', 'name_small' : 'NOV' },
    { 'id': 12, 'name': 'Dezembro', 'name_small' : 'DEZ' },
  ];


  ngOnInit() {
    const igrejaIdString = window.sessionStorage.getItem('igreja_id');
    this.igrejaId = igrejaIdString ? Number(igrejaIdString) : null;
    this.makeCalendar(this.year, this.month);
  }

  constructor(
    private getAgendaCalendarioService: GetAgendaCalendarioService
  ) {
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth() + 1;
  }


  carregarCalendario(){
    console.log(this.igrejaId);
    this.getAgendaCalendarioService.getAgendaCalendario(this.igrejaId!).subscribe({
      next: (response) => {
        if (response.status == 1) {
          response.calendario.forEach((o: any) => {
            const dia = o.agenda_data.substr(0, 2);
            const mes = o.agenda_data.substr(3, 2);
            const ano = o.agenda_data.substr(6, 4);

            if (ano == this.year && mes == this.month) {
              document.getElementById(dia)?.classList.add("dia_eventos"); // Adiciona a classe ao elemento correspondente
              console.log(mes);
            }
          });
        }
      },
      error: (error) => {
        console.error('Erro ao carregar o calendário', error);
      }
    })
  }





  makeCalendar(year: number, month: number) {
    const getCheck = this.letsCheck(year, month);
    this.firstDay = getCheck.firstDay === 0 ? 7 : getCheck.firstDay;
    this.daysInMonth = []; // Limpar o array antes de adicionar novos dias

    for (let i = 1; i <= getCheck.daysInMonth; i++) {
      this.daysInMonth.push(i);
    }

    this.monthName = this.months.find(x => x.id === month)?.name_small || '';
    
    // Carregar o calendário se igrejaId estiver presente
    if (this.igrejaId != null && this.igrejaId.toString() != '') {
      this.carregarCalendario();
    }
  }

  letsCheck(year: number, month: number) {
    // Aqui você deve implementar a lógica para calcular o primeiro dia do mês e os dias no mês
    const firstDay = new Date(year, month - 1, 1).getDay(); // 0 (domingo) a 6 (sábado)
    const daysInMonth = new Date(year, month, 0).getDate(); // Obter o total de dias do mês
    return { firstDay, daysInMonth };
  }


  nextMonth() {
    this.month++;
    if (this.month > 12) {
        this.year++;
        this.month = 1;
    }
    this.updateCalendar();
  }

  prevMonth() {
      this.month--;
      if (this.month < 1) {
          this.year--;
          this.month = 12;
      }
      this.updateCalendar();
  }

  private updateCalendar() {
      // Limpa a lista de dias e atualiza o texto do mês/ano
      this.daysInMonth = [];
      this.monthName = this.months.find(x => x.id === this.month)?.name_small || '';
      this.makeCalendar(this.year, this.month);
      this.selectedDay = null; // Limpa a seleção do dia, se necessário
      // Adicione qualquer lógica adicional necessária aqui, como limpar a lista de agenda
  }


  onDayClick(day: number) {
    this.selectedDay = day;
  }
}
