import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calendario-utils',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './calendario-utils.component.html',
  styleUrls: ['./calendario-utils.component.scss'] // Corrigido de 'styleUrl' para 'styleUrls'
})
export class CalendarioUtilsComponent {
  globalCY!: number;
  globalCM!: number;
  monthName!: string;
  daysInMonth!: number;
  firstDay!: number;

  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  months = [
    { id: 1, name: 'Janeiro' },
    { id: 2, name: 'Fevereiro' },
    { id: 3, name: 'Março' },
    { id: 4, name: 'Abril' },
    { id: 5, name: 'Maio' },
    { id: 6, name: 'Junho' },
    { id: 7, name: 'Julho' },
    { id: 8, name: 'Agosto' },
    { id: 9, name: 'Setembro' },
    { id: 10, name: 'Outubro' },
    { id: 11, name: 'Novembro' },
    { id: 12, name: 'Dezembro' }
  ];

  selectedDay: number | null = null;

  constructor() { }

  ngOnInit(): void {
    const today = new Date();
    this.globalCY = today.getFullYear();
    this.globalCM = today.getMonth(); // getMonth() retorna o mês no formato 0-11
    this.makeCalendar(this.globalCY, this.globalCM);
  }

  makeCalendar(year: number, month: number): void {
    const { daysInMonth, firstDay } = this.letsCheck(year, month);
    this.daysInMonth = daysInMonth;
    this.firstDay = firstDay;

    console.log(`Recalculando: ${this.months[month].name} - ${firstDay} - Dias: ${daysInMonth}`);
    // Corrigir a exibição do nome do mês, considerando que 'getMonth()' é zero-indexed
    this.monthName = this.months[month].name; 
    this.globalCY = year;
    this.globalCM = month;
  }

  nextMonth(): void {
    if (this.globalCM < 11) {
      this.globalCM++;
    } else {
      this.globalCM = 0;
      this.globalCY++;
    }
    this.makeCalendar(this.globalCY, this.globalCM);
  }

  prevMonth(): void {
    if (this.globalCM > 0) {
      this.globalCM--;
    } else {
      this.globalCM = 11;
      this.globalCY--;
    }
    this.makeCalendar(this.globalCY, this.globalCM);
  }

  letsCheck(year: number, month: number): { daysInMonth: number, firstDay: number } {
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Número de dias no mês
    let firstDay = new Date(year, month, 1).getDay(); // Pega o primeiro dia da semana do mês
    
    // Ajusta para que o domingo (0) seja tratado como 6 e segunda-feira (1) como 0
    firstDay = firstDay === 0 ? 6 : firstDay - 1;
  
    return { daysInMonth, firstDay };
  }

  selectDay(day: number): void {
    this.selectedDay = day;
    const selectedDate = new Date(this.globalCY, this.globalCM, day);
    
    console.log('Selected Date: ', selectedDate);
  }
}
