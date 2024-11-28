import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCamera, faXmark, faCheck, faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-configurar-perfil-igreja',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './configurar-perfil-igreja.component.html',
  styleUrl: './configurar-perfil-igreja.component.scss'
})
export class ConfigurarPerfilIgrejaComponent {

  faXmark = faXmark;
  faCheck = faCheck;
  faCamera = faCamera;
  faClock = faClock;

  imagemUrl: string | undefined;

}
