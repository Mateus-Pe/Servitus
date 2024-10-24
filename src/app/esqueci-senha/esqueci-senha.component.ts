import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EsqueciSenhaService } from '../services/esqueci-senha/esqueci-senha.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, CommonModule],
  templateUrl: './esqueci-senha.component.html',
  styleUrl: './esqueci-senha.component.scss'
})
export class EsqueciSenhaComponent {
  faMobileScreenButton = faMobileScreenButton;
  usuario_celular = '';
  message = '';
  isAlert = false;
  isVerify = false;
  showDivHide = true;
  showDivGif = false;

  constructor(private esqueciSenhaService: EsqueciSenhaService, private router: Router){}

  getEsqueciSenha(){
    if (this.usuario_celular.length < 11 || this.usuario_celular.length == 0){
      this.message = 'Digite seu celular para continuar';
      this.isAlert = true;
      this.isVerify = false;
      return;
    }
    this.esqueciSenhaService.esqueci_senha(this.usuario_celular).subscribe({
      next: (response) => {
        if (response.status === 1){
          this.envioCompleto();
        }else{
          this.envioIncompleto();
        }
      },
      error: (error) => {
        console.error('Erro na autenticação:', error);
      }
    })
  }

  envioCompleto(){
    this.isAlert = false;
    this.isVerify = true;
    this.message = 'Instruções de recuperação de senha enviada em seu celular';
    this.showDivHide = false;
    this.showDivGif = true;
  }

  envioIncompleto(){
    this.isAlert = true;
    this.isVerify = false;
    this.message = 'Celular não encontrado';
    this.showDivHide = true;
    this.showDivGif = false;
  }

  @HostListener('focusin', ['$event.target'])
  onFocus(target: HTMLElement) {
    if (target.id === 'celular') {
      this.message = '';
    }
  }

}
