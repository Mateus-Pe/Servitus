import { Component, HostListener  } from '@angular/core';
import { LoginService } from '../services/login/login.service';
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
  //Var ions --------------------------------------
  faCheck = faCheck;
  faMobileScreenButton = faMobileScreenButton;
  faKey = faKey;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  //Var login -------------------------------------
  usuario_celular: string | number | null = null;
  usuario_senha = '';
  errorMessage = '';
  showPassword = false;

  //construtor -------------------------------------------------------------------------
  constructor(private loginService: LoginService,
              private router: Router)
  {};

  //Serviços ---------------------------------------------------------------------------
  login(){
    const cel = String(this.usuario_celular).trim();
    this.usuario_senha = this.usuario_senha.trim();

    if (cel.length != 11 || cel == ''){
      this.errorMessage = 'Digite seu DDD + Celular para prosseguir';
      return;
    }else{
      this.errorMessage = '';
    }
    if (!this.usuario_senha) {
      this.errorMessage = 'Digite a senha para prosseguir';
      return;
    }
    this.loginService.login(cel, this.usuario_senha).subscribe({
      next: (response) => {
        if (response.status == 1){
          window.sessionStorage.setItem('paroquia_id', response.usuario.usuario_paroquia_id);
          this.router.navigate(['/lista-igreja']);
        }else{
          this.errorMessage = "Usuário ou senha incorretos";
        }
      },
      error: (error) =>{
        console.error('Erro na autenticação:', error);
      }
    })
  }

  //Funções -------------------------------------------------------------------------------------------
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

  permitirApenasNumeros(event: KeyboardEvent): boolean {
    const charCode = event.key.charCodeAt(0);
  
    // Permite apenas números (48–57 para números) e teclas de controle como Backspace, Delete, Tab
    if (
      (charCode >= 48 && charCode <= 57) || // Números 0–9
      event.key === 'Backspace' ||
      event.key === 'Tab' ||
      event.key === 'Delete' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight'
    ) {
      return true;
    }
  
    event.preventDefault(); // Impede qualquer outro caractere
    return false;
  }

  esqueciSenha(){
    this.router.navigate(['/esqueci-senha'])
  }
}
