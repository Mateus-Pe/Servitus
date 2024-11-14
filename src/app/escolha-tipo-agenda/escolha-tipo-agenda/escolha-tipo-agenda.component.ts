import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarDay, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-escolha-tipo-agenda',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './escolha-tipo-agenda.component.html',
  styleUrl: './escolha-tipo-agenda.component.scss'
})
export class EscolhaTipoAgendaComponent {
  faCalendarDay = faCalendarDay;
  faCalendarDays = faCalendarDays;

  constructor(private router: Router){}

  selectEspecifica(){
    this.router.navigate(['/criar-agenda-especifica']);
  }

  selectRecorrente(){
    this.router.navigate(['/criar-agenda']);
  }

  selectAgoraNao(){
    this.router.navigate(['/calendario']);
  }
}
