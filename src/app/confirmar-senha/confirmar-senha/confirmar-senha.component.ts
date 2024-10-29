import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faUnlock, faEye, faEyeSlash, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { AlterarSenhaService } from '../../services/alterar_senha/alterar-senha.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmar-senha',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './confirmar-senha.component.html',
  styleUrl: './confirmar-senha.component.scss'
})
export class ConfirmarSenhaComponent {
  faCheck = faCheck;
  faUnlock = faUnlock;
  faEye = faEye;
  faCircleCheck = faCircleCheck;
  faEyeSlash = faEyeSlash;

  showPassword = false;
  showPasswordConfirm = false;
  usuario_senha = '';
  confirma_senha = '';
  urlParams = new URLSearchParams(window.location.search);
  usuario_token = this.urlParams.get('t') || '';
  errorMessage = '';

  constructor(private alterarSenhaService: AlterarSenhaService, private router: Router){}

  getAlterarSenha(){
    if (this.usuario_senha == ''){
      this.errorMessage = 'Digite sua senha!';
      return;
    }else if (this.confirma_senha == ''){
      this.errorMessage = 'Confirme sua senha!';
      return;
    }else if (this.usuario_senha != this.confirma_senha){
      this.errorMessage = 'Deu algo errado, confirme novamente sua senha!'
      return;
    }else{
      this.errorMessage = '';
    }

    this.alterarSenhaService.alterar_senha(this.usuario_senha, this.usuario_token).subscribe({
      next: (response) => {
        if(response.status == 1) {
          window.sessionStorage.setItem('paroquia_id', response.usuario.usuario_paroquia_id);
          console.log('deu certo');
        }
      },
      error: (error) => {
        console.error('Erro na autenticação:', error);
      }
    })
  }







  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(){
    this.showPasswordConfirm = !this.showPasswordConfirm;
  }

  get senhaInputType():string{
    return this.showPassword ? 'text' : 'password';
  }

  get confirmarSenhaInputType():string{
    return this.showPasswordConfirm ? 'text' : 'password';
  }

  @HostListener('focusin', ['$event.target'])
  onFocus(target: HTMLElement) {
    if (target.id === 'confirmar_senha' || target.id === 'senha') {
      this.errorMessage = '';
    }
  }

}
