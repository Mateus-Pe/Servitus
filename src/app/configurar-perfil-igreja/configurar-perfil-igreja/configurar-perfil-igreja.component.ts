import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCamera, faXmark, faCheck, faClock, faChurch } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '../../modal/modal/modal.component';
import { GetIgrejaByIdService } from '../../services/get-igreja-by-id/get-igreja-by-id.service';
import { GetBancoImgService } from '../../services/get-banco-img/get-banco-img.service';

@Component({
  selector: 'app-configurar-perfil-igreja',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ModalComponent, FormsModule],
  templateUrl: './configurar-perfil-igreja.component.html',
  styleUrl: './configurar-perfil-igreja.component.scss'
})


export class ConfigurarPerfilIgrejaComponent {

  constructor(private getIgrejaById: GetIgrejaByIdService,
              private getBancoImgService: GetBancoImgService,
              private router: Router){}

  //var ions------------------------------------
  faXmark = faXmark;
  faCheck = faCheck;
  faCamera = faCamera;
  faClock = faClock;
  faChurch = faChurch;
  //var services--------------------------------
  imgIgrejaUrl: string | null = null;
  imgFundoUrl: string | null = null;
  nomeIgreja: string | null = null;
  enderecoIgreja: string | null = null;

  bancoImagem: any[] = [];
  bancoImagemFiltrado: any[] = [];
  pesquisa = '';
  imgVemDoBanco = false;
  previewImg: boolean = false;
  origemImagem: string = '';

  igrejaId: number | null = null;

  //var controle display------------------------
  existeFundo = false;

  showModalContatos = false;
  showModalBancoImg = false;
  showModalNome = false;

  //var estilo modal----------------------------
  estiloModalContent = {
    'width': '80%',
    'padding': 'unset',
    'padding-top': '20px',
    'padding-bottom': '20px'
  };

  estilosModalContentBancoImg = {
    'padding': 'unset',
    'width': '90%',
    'border-radius': '5px',
    'font-size': '2rem',
    'border-top': '1px solid rgba(0, 0, 0, 0.16)',
    'box-shadow': '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)'
  }

  //var Funções--------------------------------
  textWhats: string | null = null;
  textFace: string | null = null;
  textInsta: string | null = null;
  textEmail: string | null = null;

  nomeIgrejaTemp: string | null = '';

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
          this.nomeIgreja = obj.igreja.igreja_nome
          this.enderecoIgreja = obj.igreja.igreja_endereco_logradouro + ", " + obj.igreja.igreja_endereco_numero + ", " + obj.igreja.igreja_endereco_bairro + ", " + obj.igreja.igreja_endereco_cidade;
        }
      },
      error: (error) => {
        console.error('Erro ao carregar a igreja', error);
      }
    })
  };

  carregarBancoImagens(): void {
    this.getBancoImgService.getBancoImg().subscribe({
      next: (response) => {
        if (response.status == '1') {
          this.openModalBancoImg();
          this.bancoImagem = response.banco_imagem;
          this.bancoImagemFiltrado = [...this.bancoImagem];
        }
      },
      error: (error) => {
        console.error('Erro ao buscar imagens', error);
      },
    });
  }

  //funções--------------------------------

  selectImgIgreja(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          const img = new Image();
          this.previewImg = false;

          img.onload = () => {
            this.imgIgrejaUrl = e.target?.result as string; // Atualiza a URL da imagem
            this.previewImg = true;
            this.origemImagem = 'U'; // Indica que a imagem veio de upload
          };

          img.src = e.target.result as string; // Carrega a imagem para verificação
        }
      };

      reader.readAsDataURL(file); // Lê o arquivo como DataURL
    }
  }

  selectImgFundoIgreja(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          const img = new Image();
          this.previewImg = false;

          img.onload = () => {
            this.imgFundoUrl = e.target?.result as string; // Atualiza a URL da imagem
            this.existeFundo = true;
            this.previewImg = true;
            this.origemImagem = 'U'; // Indica que a imagem veio de upload
          };

          img.src = e.target.result as string; // Carrega a imagem para verificação
        }
      };

      reader.readAsDataURL(file); // Lê o arquivo como DataURL
    }
  }

  clickSelectFileIgreja(): void {
    const fileInput = document.getElementById('selectFileIgreja') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
      this.closeModalBancoImg();
    }
  }

  clickSelectFileFundoIgreja(): void {
    const fileInput = document.getElementById('selectFileFundoIgreja') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }


  mascaraTelefone(event: any): void {
    let telefone = this.textWhats?.replace(/\D/g, '') || ''; // Remove todos os caracteres não numéricos
  
    // Limita o número a 11 dígitos
    if (telefone.length > 11) {
      telefone = telefone.slice(0, 11);
    }
  
    let telefoneFormatado = '';
  
    // Formatação condicional
    if (telefone.length > 2) {
      telefoneFormatado = '(' + telefone.substring(0, 2) + ') ';
    }
    if (telefone.length > 7) {
      telefoneFormatado += telefone.substring(2, 7) + '-' + telefone.substring(7);
    } else if (telefone.length > 2) {
      telefoneFormatado += telefone.substring(2);
    } else {
      telefoneFormatado = telefone;
    }
  
    // Atualiza a variável vinculada ao modelo
    this.textWhats = telefoneFormatado;
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

  filtrarImagens(): void {
    this.bancoImagemFiltrado = this.bancoImagem.filter((img) =>
      img.igreja_nome.toUpperCase().includes(this.pesquisa.toUpperCase())
    );
  }

  selecionarImagem(src: string) {
    this.imgIgrejaUrl = src; // Atualiza a imagem selecionada
    this.imgVemDoBanco = true
    this.closeModalBancoImg(); // Fecha o modal
  }

  openModalContatos(){
    this.showModalContatos = true;
  };

  openModalBancoImg(){
    this.showModalBancoImg = true;
    document.body.style.overflow = 'hidden';
  }

  openModalNome(){
    this.showModalNome = true;
    this.nomeIgrejaTemp = this.nomeIgreja;
  }

  closeModalContatos(){
    this.showModalContatos = false;
  }

  closeModalBancoImg(){
    this.showModalBancoImg = false;
    document.body.style.overflow = 'auto';
  }

  closeModalNome(){
    this.showModalNome = false;
    if (!this.nomeIgrejaTemp!.trim()) {
      this.nomeIgrejaTemp = this.nomeIgreja;
    } else {
      this.nomeIgreja = this.nomeIgrejaTemp!.trim();
    }
  }

  backToLista(){
    this.router.navigate(['/lista-igreja']);
  }
}
