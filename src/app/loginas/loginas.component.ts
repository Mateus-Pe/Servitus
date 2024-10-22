import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loginas',
  standalone: true,
  imports: [ FontAwesomeModule ],
  templateUrl: './loginas.component.html',
  styleUrls: ['./loginas.component.scss']
})
export class LoginasComponent {
  faCheck = faCheck;
  faMobileScreenButton = faMobileScreenButton;
  faKey = faKey;
  faEye = faEye;
  constructor(private LoginService: LoginService) {
    this.LoginService.getParoquias().subscribe({
      next: (data) => {
        console.log('Dados recebidos:', data);
      },
      error: (error) => {
        console.error('Erro ao chamar a API:', error);
      },
      complete: () => {
        console.log('Chamada à API finalizada');
      }
    });
  }
}
