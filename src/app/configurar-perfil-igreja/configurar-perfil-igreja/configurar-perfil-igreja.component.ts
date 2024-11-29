import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCamera, faXmark, faCheck, faClock } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '../../modal/modal/modal.component';
import { GetIgrejaByIdService } from '../../services/get-igreja-by-id/get-igreja-by-id.service';

@Component({
  selector: 'app-configurar-perfil-igreja',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ModalComponent, FormsModule],
  templateUrl: './configurar-perfil-igreja.component.html',
  styleUrl: './configurar-perfil-igreja.component.scss'
})


export class ConfigurarPerfilIgrejaComponent {

  constructor(private getIgrejaById: GetIgrejaByIdService,
              private router: Router){}

  //var ions------------------------------------
  faXmark = faXmark;
  faCheck = faCheck;
  faCamera = faCamera;
  faClock = faClock;
  //var services--------------------------------
  imgIgrejaUrl: string | null = null;
  imgFundoUrl: string | null = null;
  enderecoIgreja: string | null = null;

  igrejaId: number | null = null;

  //var controle display------------------------
  existeFundo = false;

  showModalContatos = false;

  //var estilo modal----------------------------
  estiloModalContent = {
    'width': '80%',
    'padding': 'unset',
    'padding-top': '20px',
    'padding-bottom': '20px'
  };

  //var Funções--------------------------------
  contatos: { tipo: 'whatsapp' | 'facebook' | 'instagram' | 'email'; valor: string; img: string }[] = [];
  imagens: { [key: string]: string } = {
    whatsapp: 'whatsapp.png',
    facebook: 'facebook.png',
    instagram: 'instagram.png',
    email: 'email.png',
  };

  contatosValores: { [key in 'whatsapp' | 'facebook' | 'instagram' | 'email']: string } = {
    whatsapp: '',
    facebook: '',
    instagram: '',
    email: ''
  };

  //Init---------------------------------------

  ngOnInit() {
    const igrejaIdString = window.sessionStorage.getItem('igreja_id');
    this.igrejaId = igrejaIdString ? Number(igrejaIdString) : null;

    if (this.igrejaId){
      this.carregarIgreja();
    }
  }

  //services-----------------------------------
  carregarIgreja(){
    this.getIgrejaById.igrejaById(this.igrejaId!).subscribe({
      next: (response) => {
        var obj = response;
        if (obj.status == '1'){
          if (obj.igreja.igreja_fundo_url != null && obj.igreja.igreja_fundo_url != ''){
            this.existeFundo = true;
            this.imgFundoUrl = obj.igreja.igreja_fundo_url;
          }

          if (obj.igreja.igreja_logo_url != null && obj.igreja.igreja_logo_url != ''){
            this.imgIgrejaUrl = obj.igreja.igreja_logo_url;
          }else{
            this.imgIgrejaUrl = 'perfil-sem-foto.jpg'
          }

          this.enderecoIgreja = obj.igreja.igreja_endereco_logradouro + ", " + obj.igreja.igreja_endereco_numero + ", " + obj.igreja.igreja_endereco_bairro + ", " + obj.igreja.igreja_endereco_cidade;
        }
      },
      error: (error) => {
        console.error('Erro ao carregar a igreja', error);
      }
    })
  };

  //funções--------------------------------

  atualizarValorContato(event: KeyboardEvent, tipo:'whatsapp' | 'facebook' | 'instagram' | 'email') {
    const inputElement = event.target as HTMLInputElement;
    const valor = inputElement.value;
    this.contatosValores[tipo] = valor;
    this.atualizarContato(tipo, valor);
  }

  atualizarContato(tipo: 'whatsapp' | 'facebook' | 'instagram' | 'email', valor: string) {
    console.log(tipo, valor);
    const contatoExistente = this.contatos.find((c) => c.tipo == tipo);
    const contato = this.contatos.find(c => c.tipo == tipo);
    if (contatoExistente) {
      contatoExistente.valor = valor; // Atualizando o valor
    }
    if (valor.trim()) {
      if (contatoExistente) {
        contatoExistente.valor = valor;
      } else {
        this.contatos.push({ tipo, valor, img: this.imagens[tipo] });
      }
    } else {
      // Remover contato se o campo estiver vazio
      this.contatos = this.contatos.filter((c) => c.tipo != tipo);
    }
    console.log(`Atualizando ${tipo} com o valor: ${valor}`);
  }
  

  openModalContatos(){
    this.showModalContatos = true;
  };

  closeModalContatos(){
    this.showModalContatos = false;
  }
}
