import { Component, EventEmitter, Output, Input  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

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
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;

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

  @Input() modo: 'mensal' | 'semanal' = 'mensal'; // Modo: 'mensal' ou 'semanal'
  @Input() selectedDay: Date | null = null;
  @Output() daySelected = new EventEmitter<string>();

  // modo semanal
  weekDays: string[] = [];
  weekDates: Date[] = [];

  constructor() { }

  ngOnInit(): void {
    const today = new Date();
    this.globalCY = today.getFullYear();
    this.globalCM = today.getMonth(); // getMonth() retorna o mês no formato 0-11
    this.montarCalendario();

    if (this.modo == 'semanal'){
      if (this.selectedDay) {
        this.daySelected.emit(this.formatDataTwo(this.selectedDay)); // Emite o evento com o valor da data selecionada
      } else {
        this.selectedDay = today; // Se não houver selectedDay, utiliza a data de hoje
        this.daySelected.emit(this.formatDataTwo(this.selectedDay)); // Emite com a data de hoje
      }
    }
  }

  montarCalendario() {
    const today = new Date();
    if (this.modo == 'mensal') {
      this.montarCalendarioMensal(this.globalCY, this.globalCM);
    } else {
      this.montarCalendarioSemanal();
      this.selectedDay = today;
      this.updateMonthName();
    }
  }

  //Modo mensal ----------------------------------------------------------------------------------------------
  montarCalendarioMensal(year: number, month: number): void {
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
    this.montarCalendarioMensal(this.globalCY, this.globalCM);
  }

  prevMonth(): void {
    if (this.globalCM > 0) {
      this.globalCM--;
    } else {
      this.globalCM = 11;
      this.globalCY--;
    }
    this.montarCalendarioMensal(this.globalCY, this.globalCM);
  }

  letsCheck(year: number, month: number): { daysInMonth: number, firstDay: number } {
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Número de dias no mês
    let firstDay = new Date(year, month, 1).getDay(); // Pega o primeiro dia da semana do mês
    
    // Ajusta para que o domingo (0) seja tratado como 6 e segunda-feira (1) como 0
    firstDay = firstDay === 0 ? 6 : firstDay - 1;
  
    return { daysInMonth, firstDay };
  }

  //Modo semanal ------------------------------------------------------------------------------------------

  montarCalendarioSemanal(): void {
    const today = this.selectedDay || new Date();  // Se houver um selectedDay, usamos ele, senão usamos o dia atual
    const firstDayOfWeek = this.getFirstDayOfWeek(today);
    
    // Define os dias da semana (7 dias a partir de hoje)
    this.weekDates = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(firstDayOfWeek);
      day.setDate(firstDayOfWeek.getDate() + i);  // Adiciona i dias à data inicial
      this.weekDates.push(day);
    }
    
    // Nomes dos dias da semana
    this.weekDays = this.weekDates.map(d => this.getDayName(d));  // Pega o nome do dia
    
    if (this.selectedDay) {
      this.updateMonthName(); // Atualiza o mês toda vez que a semana for atualizada
    }
  }

  getFirstDayOfWeek(date: Date): Date {
    const day = date.getDay(); // Retorna o dia da semana (0 = domingo, 1 = segunda, ..., 6 = sábado)
    let diff = date.getDate() - day; // Ajuste para o primeiro dia da semana (domingo)
    
    // Se você quiser que a semana comece na quinta-feira (como no seu caso), ajusta para o dia correto.
    // A semana começa no 'day' de hoje, então podemos manipular a data diretamente.
    diff = date.getDate();  // Ajusta para o dia que queremos começar a semana
    
    const firstDay = new Date(date);
    firstDay.setDate(diff); // Define a data do primeiro dia da semana (hoje)
  
    return firstDay;
  }
  
  // Função que retorna o nome do dia (Seg, Ter, Qua, etc)
  getDayName(date: Date): string {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    return days[date.getDay()];
  }
  
  // Funções para navegação semanal ---------------------------------------------------------------------
  nextDay(): void {
    if (this.selectedDay) {
      const nextDay = new Date(this.selectedDay); // Agora garantimos que selectedDay não seja null
      nextDay.setDate(nextDay.getDate() + 1); // Avança 1 dia
      this.selectedDay = nextDay; // Atualiza o dia selecionado
      this.montarCalendarioSemanal(); // Atualiza a semana
      this.daySelected.emit(this.formatDataTwo(this.selectedDay));
    } else {
      console.log('selectedDay é nulo');
      // Defina um valor padrão para selectedDay, caso seja nulo
      this.selectedDay = new Date(); // Por exemplo, se for nulo, use a data atual
    }
  }

  prevDay(): void {
    if (this.selectedDay) {
      const prevDay = new Date(this.selectedDay); // Agora garantimos que selectedDay não seja null
      prevDay.setDate(prevDay.getDate() - 1); // Retrocede 1 dia
      this.selectedDay = prevDay; // Atualiza o dia selecionado
      this.montarCalendarioSemanal(); // Atualiza a semana
      this.daySelected.emit(this.formatDataTwo(this.selectedDay));
    } else {
      console.log('selectedDay é nulo');
      this.selectedDay = new Date(); // Definindo um valor padrão
    }
  }

  nextWeek(): void {
    if (this.selectedDay) {
      const nextWeekStart = new Date(this.selectedDay); // Pega o dia selecionado atual
      nextWeekStart.setDate(nextWeekStart.getDate() + 7); // Avança 7 dias (1 semana)
      this.selectedDay = nextWeekStart; // Atualiza o dia selecionado para o próximo começo de semana
      this.montarCalendarioSemanal(); // Atualiza a semana
      this.daySelected.emit(this.formatDataTwo(this.selectedDay));
    } else {
      console.log('selectedDay é nulo');
      this.selectedDay = new Date(); // Definindo um valor padrão
    }
  }

  prevWeek(): void {
    if (this.selectedDay) {
      const prevWeekStart = new Date(this.selectedDay); // Pega o dia selecionado atual
      prevWeekStart.setDate(prevWeekStart.getDate() - 7); // Retrocede 7 dias (1 semana)
      this.selectedDay = prevWeekStart; // Atualiza o dia selecionado para o início da semana anterior
      this.montarCalendarioSemanal(); // Atualiza a semana
      this.daySelected.emit(this.formatDataTwo(this.selectedDay));
    } else {
      console.log('selectedDay é nulo');
      this.selectedDay = new Date(); // Definindo um valor padrão
    }
  }

  //Função para ambos -------------------------------------------------------------------------------------

  selectDay(day: number): void {
    
    if (this.modo == 'mensal'){
      this.selectedDay = new Date(this.globalCY, this.globalCM, day);
      const selectedDate = new Date(this.globalCY, this.globalCM, day);
      this.daySelected.emit(this.formatDate(selectedDate));
    }

    if (this.modo == 'semanal'){
      const selectedIndex = this.weekDates.findIndex(date => date.getDate() === day);
      if (selectedIndex !== -1) {
        const selectedDate = this.weekDates[selectedIndex];
        this.selectedDay = selectedDate;
        this.daySelected.emit(this.formatDataTwo(selectedDate));
      } else {
        console.error('Índice de semana inválido para o dia: ', day);
      }
    }
    this.updateMonthName();
    
  }

  updateMonthName(): void {
    if (this.selectedDay) {
      const options: Intl.DateTimeFormatOptions = { 
        month: 'long'
      };
      this.monthName = this.selectedDay.toLocaleDateString('pt-BR', options);
    }
  }

  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;  // Retorna a data no formato dd/mm/yyyy
  }

  formatDataTwo(data: Date): string {
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Mês com 2 dígitos
    const dia = data.getDate().toString().padStart(2, '0'); // Dia com 2 dígitos
  
    return `${ano}-${mes}-${dia}`;
  }
}
