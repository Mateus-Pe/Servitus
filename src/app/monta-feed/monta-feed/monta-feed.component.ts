import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-monta-feed',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './monta-feed.component.html',
  styleUrl: './monta-feed.component.scss'
})
export class MontaFeedComponent {
  faShareNodes = faShareNodes;

  @Input() linha: any;
  @Input() i: any;

  dias = [
    { 'id': 1, 'name': 'Segunda' },
    { 'id': 2, 'name': 'Terça' },
    { 'id': 3, 'name': 'Quarta' },
    { 'id': 4, 'name': 'Quinta' },
    { 'id': 5, 'name': 'Sexta' },
    { 'id': 6, 'name': 'Sábado' },
    { 'id': 0, 'name': 'Domingo' },
  ];
  
  months = [
    { 'id': 1, 'name': 'Jan' },
    { 'id': 2, 'name': 'Fev' },
    { 'id': 3, 'name': 'Mar' },
    { 'id': 4, 'name': 'Abr' },
    { 'id': 5, 'name': 'Mai' },
    { 'id': 6, 'name': 'Jun' },
    { 'id': 7, 'name': 'Jul' },
    { 'id': 8, 'name': 'Ago' },
    { 'id': 9, 'name': 'Set' },
    { 'id': 10, 'name': 'Out' },
    { 'id': 11, 'name': 'Nov' },
    { 'id': 12, 'name': 'Dez' },
  ];

  formataHora(data: string): string {
    const hashdata = data.split("-");
    const ano = parseInt(hashdata[0], 10);
    const mes = parseInt(hashdata[1], 10);
    const D = parseInt(hashdata[2], 10);
    const H = hashdata[3];
    const hoje = new Date();
    const S = new Date(ano, mes - 1, D).getUTCDay();
    const date_ref = new Date(ano, mes - 1, D);
    const diff = new Date(date_ref.getTime() - hoje.getTime());
    const diff_days = diff.getTime() / 1000 / 60 / 60 / 24;

    let strHora = H;
    return strHora;
  }

  formataDia(data: string): string {
    const hashdata = data.split('-');
    const ano = parseInt(hashdata[0], 10);  // Conversão para número
    const mes = parseInt(hashdata[1], 10); // Conversão para número
    const D = parseInt(hashdata[2], 10);   // Conversão para número
    const hoje = new Date();
    const S = new Date(ano, mes - 1, D).getUTCDay();
    const date_ref = new Date(ano, mes - 1, D);
    const diff = new Date(date_ref.getTime() - hoje.getTime());
    const diff_days = diff.getTime() / 1000 / 60 / 60 / 24;

    let strDia = '';
    let diaName = this.dias.find(x => x.id === S)?.name || '';
    let mesName = this.months.find(x => x.id === mes)?.name || '';

    if (Math.floor(diff_days) < 7) {
      if (Math.floor(diff_days) < 2) {
        if (D === hoje.getDate()) {
          strDia = 'Hoje';
        }
        if (D === hoje.getDate() + 1) {
          strDia = 'Amanhã';
        }
      } else {
        strDia = diaName;
      }
    }

    if (D < 10) {
      strDia = `0${D}`;
    }
    if (!strDia) {
      strDia = `${D}/${mesName}`;
    }

    return strDia;
  }
}
