import { Component, OnInit, Input  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faPenToSquare, faPlus, faUserPlus, faUser, faPhone, faBriefcase, faCopy } from '@fortawesome/free-solid-svg-icons';
import { GetListaParoquiaService } from '../services/get-lista-paroquia/get-lista-paroquia.service';
import { NovaParoquiaService } from '../services/nova_paroquia/nova-paroquia.service';
import { NovoUsuarioService } from '../services/novo_usuario/novo-usuario.service';

@Component({
  selector: 'app-administrar-igreja',
  standalone: true,
  imports: [ CommonModule, FontAwesomeModule, FormsModule ],
  templateUrl: './administrar-igreja.component.html',
  styleUrls: ['./administrar-igreja.component.scss'] 
})
export class AdministrarIgrejaComponent implements OnInit {
  faPenToSquare = faPenToSquare;
  faUserPlus = faUserPlus;
  faLocationDot = faLocationDot;
  faPlus = faPlus;
  faUser = faUser;
  faPhone = faPhone;
  faBriefcase = faBriefcase;
  faCopy = faCopy;

  @Input() igrejas: any[] = [];
  cidadeId: number | null = null;
  cidadeNome = '';

  modalAdicionar: boolean = false;
  idParoquia: number | null = null;
  usuarioNome: string = '';
  usuarioCelular: number | null = null;
  usuarioTipo: string = 'tipo';
  linkUsuario: string = '';

  constructor(
    private getListaParoquiaService: GetListaParoquiaService, 
    private novaParoquiaService : NovaParoquiaService,
    private novoUsuarioService : NovoUsuarioService, 
    private router: Router
  ){}

  ngOnInit(): void {
    const cidadeIdString = window.sessionStorage.getItem('cidade_id');
    this.cidadeId = cidadeIdString ? parseInt(cidadeIdString, 10) : null;
    this.cidadeNome = sessionStorage.getItem('cidade_nome') || '';
    sessionStorage.setItem('origem', 'administrar-igreja');

    if (!this.cidadeId || !this.cidadeNome) {
      console.warn('Cidade não definida. Redirecionando para a tela Estado.');
      this.router.navigate(['/estado']);
      return;
    }
    
    this.getParoquias();
  }

  getParoquias(): void{
    this.getListaParoquiaService.getParoquia(this.cidadeId!).subscribe({
      next: (response) => {
        this.igrejas = response;
      },
      error: (error) => {
        console.error('Erro na autenticação:', error);
      }
    })
  }


  getNovaParoquia(): void{
    this.novaParoquiaService.getNovaParoquia(this.cidadeId!).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status == '1'){
          window.sessionStorage.setItem('paroquia_id', response.paroquia_id);
          this.router.navigate(['/criar-igreja']);
        }
      },
      error: (error) => {
        console.error('Erro ao criar nova paróquia:', error);
      }
    })
  }


  getNovoUsuario(): void{
    console.log(this.usuarioNome, this.usuarioCelular, this.usuarioTipo, this.idParoquia);
    if (this.usuarioNome && this.usuarioCelular && this.usuarioTipo && this.idParoquia) {
    this.novoUsuarioService.getNovoUsuario(this.idParoquia, this.usuarioNome, this.usuarioCelular, this.usuarioTipo).subscribe({
      next: (response) => {
        console.log('Usuário adicionado com sucesso:', response);
        this.closeModal();
      },
      error: (error) => {
        console.error('Erro ao adicionar usuário:', error);
      }
    });
    }else{
      console.error('Dados do usuário estão incompletos');
    }
  }





  toggleAccordion(paroquia: any) {
    paroquia.expanded = !paroquia.expanded;

    if (paroquia.expanded) {
        const element = document.querySelector(`#detalhes-${paroquia.id}`) as HTMLElement;
        if (element) {
          const fullHeight = element.scrollHeight; // Altura total
          element.style.maxHeight = `${fullHeight}px`; // Definindo max-height para a altura total
        }
    } else {
      const element = document.querySelector(`#detalhes-${paroquia.id}`) as HTMLElement;
      if (element) {
        setTimeout(() => {
          element.style.maxHeight = '0'; // Fechando o painel
        }, 5);
      }
    }
  }

  toggleDetalhes(comunidade: any) {
    if (comunidade.expanded) {
      comunidade.expanded = !comunidade.expanded;
    } else {
      // Se não, feche todos os outros detalhes primeiro
      this.igrejas.forEach((paroquia: any) => {
        paroquia.listabycat.forEach((comunidadeItem: any) => {
          if (comunidadeItem !== comunidade) {
            comunidadeItem.expanded = false;  // Fecha as outras igrejas
          }
        });
      });
  
      // Abre a igreja clicada
      comunidade.expanded = true;
    }
  }

  openModal(paroquiaId : number){
    this.idParoquia = paroquiaId;
    this.modalAdicionar = true;
    console.log(this.idParoquia);
  }

  closeModal(){
    this.modalAdicionar = false;
    this.usuarioNome = '';
    this.usuarioCelular = null;
    this.usuarioTipo = 'tipo';
    this.linkUsuario = '';
  }

  editarParoquia(idParoquia: number){
    window.sessionStorage.setItem('paroquia_id', idParoquia.toString());
    console.log(idParoquia);
    this.router.navigate(['/lista-igreja']);
  }

  selecionarCidade(){
    this.router.navigate(['/estado']);
  }
}
