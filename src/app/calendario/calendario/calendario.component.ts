import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight, faPlus, faEllipsis, faImage, faGear, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '../../modal/modal/modal.component';
import { GetAgendaCalendarioService } from '../../services/get-agenda-calendario/get-agenda-calendario.service';
import { AgendaCalendarioHoraService } from '../../services/agenda_calendario_hora/agenda-calendario-hora.service';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, ModalComponent],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent implements OnInit {
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faPlus = faPlus;
  faEllipsis = faEllipsis;
  faImage = faImage;
  faGear = faGear;
  faTrash = faTrash;
  faXmark = faXmark;

  year: number;
  month: number;
  daysInMonth: number[] = [];
  firstDay: number = 0;
  monthName: string = '';
  igrejaId: number | null = null;
  selectedDay: number | null = null;
  eventDays: number[] = [];
  agendaItems: any[] = [];

  showModalConfig = false;
  agendaId: number | null = null;
  agendaImg: string | null = null;
  agendaHora: string | null = null;
  agendaStatus: number | null = null;
  igrejaLogoUrl: string | null = null;
  igrejaNome: string | null = null;
  agendaDesc: string | null = 'Adicione um comentário para visualiza-lo';
  showModalViewAgenda = false;


  estiloModal = {
    'background-color': 'black'
  };
  estiloModalContent = {
    'width': '90%',
    'border-radius': '10px',
    'padding': 'unset'
  };


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
    
    if (this.igrejaId) {
      this.makeCalendar(this.year, this.month);
    } else {
      console.error("Igreja ID não encontrado no sessionStorage.");
    }
  }

  /*---------------------SERVIÇOS-----------------------*/

  constructor(
    private getAgendaCalendarioService: GetAgendaCalendarioService,
    private agendaCalendarioHoraService: AgendaCalendarioHoraService
  ) {
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth() + 1;
  }


  carregarCalendario(){
    this.getAgendaCalendarioService.getAgendaCalendario(this.igrejaId!).subscribe({
      next: (response) => {
        if (response.status == 1) {
          this.eventDays = [];
          response.calendario.forEach((o: any) => {
            const dia = Number( o.agenda_data.substr(0, 2));
            const mes = o.agenda_data.substr(3, 2);
            const ano = o.agenda_data.substr(6, 4);

            if (ano == this.year.toString() && mes == this.month.toString().padStart(2, '0')) {
              this.eventDays.push(dia);
            }
          });
        }
      },
      error: (error) => {
        console.error('Erro ao carregar o calendário', error);
      }
    })
  }

  get_calendario_hora(dtReferencia: string){
    this.agendaCalendarioHoraService.getAgendaCalendarioHora(this.igrejaId!, dtReferencia).subscribe({
      next: (response) => {
        this.agendaItems = response.calendario_hora;
      },
      error: (error) => {
        console.error('Erro ao carregar as agendas', error);
      }
    })
  }


 /*---------------------FUNCIONALIDADES-----------------------*/


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
      this.agendaItems = [];
      // Adicione qualquer lógica adicional necessária aqui, como limpar a lista de agenda
  }

  isEventDay(day: number): boolean {
    return this.eventDays.includes(day); 
  }


  onDayClick(day: number, currentMonth: number, currentYear: number): void {
    this.selectedDay = day;
    const data = `${currentYear}-${currentMonth}-${day}`;
    this.get_calendario_hora(data);
  }

  statusLayoutColor(status: string): string {
    switch (status) {
      case '0':
      case '1':
        return 'red';
      case '2':
        return 'green';
      case '3':
        return 'orange';
      default:
        return 'gray'; // Cor padrão caso o status não corresponda a nenhum caso
    }
  }

  openModalConfig(item: any){
    this.agendaId = item.agenda_id;
    this.agendaImg = item.agenda_img;
    this.agendaHora = item.agenda_hora;
    this.agendaStatus = item.agenda_layout_tipo;
    this.igrejaLogoUrl = item.igreja_logo_url;
    this.igrejaNome = item.igreja_nome;
    this.agendaDesc = item.agenda_layout_upload_desc;
    this.showModalConfig = true;
  }

  closeModalConfig(){
    this.showModalConfig = false;
  }

  openModalViewAgenda(){
    this.showModalViewAgenda = true;
    this.showModalConfig = false;
  }

  closeModalViewAgenda(){
    this.showModalViewAgenda = false;
  }
}
