import { Component } from '@angular/core';
import { CalendarioUtilsComponent } from '../../calendario-utils/calendario-utils.component';

@Component({
  selector: 'app-calendario-feed',
  standalone: true,
  imports: [CalendarioUtilsComponent],
  templateUrl: './calendario-feed.component.html',
  styleUrl: './calendario-feed.component.scss'
})
export class CalendarioFeedComponent {
  modoCalendario: 'mensal' | 'semanal' = 'semanal';
  constructor(
  ){}

}
