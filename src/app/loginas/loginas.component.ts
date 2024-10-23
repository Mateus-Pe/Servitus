import { Component, HostListener  } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash, faCheck, faMobileScreenButton, faKey  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loginas',
  standalone: true,
  imports: [ FontAwesomeModule, FormsModule ],
  templateUrl: './loginas.component.html',
  styleUrls: ['./loginas.component.scss']
})
export class LoginasComponent {
  faCheck = faCheck;
  faMobileScreenButton = faMobileScreenButton;
  faKey = faKey;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  usuario_celular = '';
  usuario_senha = '';
  errorMessage = '';
  showPassword = false;


  constructor(private loginService: LoginService, private router: Router){}

  login(){
    if (this.usuario_celular.length < 9){
      this.errorMessage = 'Digite seu DDD + Celular para prosseguir';
      return;
    }else{
      this.errorMessage = '';
    }
    this.loginService.login(this.usuario_celular, this.usuario_senha).subscribe({
      next: (response) => {
        if (response.status === 1){
          window.sessionStorage.setItem('paroquia_id', response.usuario.usuario_paroquia_id)
        }else{
          this.errorMessage = "Usuário ou senha incorretos";
        }
      },
      error: (error) =>{
        console.error('Erro na autenticação:', error);
      }
    })
  }


  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

  get inputType():string{
    return this.showPassword ? 'text' : 'password';
  }

  @HostListener('focusin', ['$event.target'])
  onFocus(target: HTMLElement) {
    if (target.id === 'celular' || target.id === 'senha') {
      this.errorMessage = '';
    }
  }
}
