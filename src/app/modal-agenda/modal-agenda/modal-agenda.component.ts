import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal-agenda',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './modal-agenda.component.html',
  styleUrl: './modal-agenda.component.scss'
})
export class ModalAgendaComponent {
  faArrowLeft = faArrowLeft;
}
