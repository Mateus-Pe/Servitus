import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faGear, faCircleChevronDown, faCircleChevronUp, faCalendar, faTrash, faChurch  } from '@fortawesome/free-solid-svg-icons';
import { ListaIgrejaService } from '../../services/lista_igreja/lista-igreja.service';
import { GetEstatisticaService } from '../../services/get-estatistica/get-estatistica.service';
import { ModalComponent } from '../../modal/modal/modal.component';
import { GetMatrizService } from '../../services/get_matriz/get-matriz.service';
import { AtualizarMatrizService } from '../../services/atualizar_matriz/atualizar-matriz.service';
import { RemoverIgrejaService } from '../../services/remover-igreja/remover-igreja.service';

@Component({
  selector: 'app-lista-igreja',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, ModalComponent],
  templateUrl: './lista-igreja.component.html',
  styleUrl: './lista-igreja.component.scss'
})
export class ListaIgrejaComponent implements OnInit {
  //var ions ------------------------------------
  faPlus = faPlus;
  faGear = faGear;
  faCircleChevronDown = faCircleChevronDown;
  faCircleChevronUp = faCircleChevronUp;
  faCalendar = faCalendar;
  faTrash = faTrash;
  faChurch = faChurch
  //var sercices --------------------------------
  paroquia_id : number | null = null;
  igrejas: any[] = [];
  eventos: any = {};
  //var igrejas selecionadas --------------------
  selectedIgrejaId: number | null = null;
  selectedIgrejaName: string | null = null;
  //var controle -------------------------
  showModal = false;
  showModalRemove = false;
  showModalConfirm = false;
  showOptionsModal = false;

  isMenuOpen: boolean = false;
  //var funções ---------------------------------
  textoModalConfirm: string | null = null;
  matrizModalConfirm: string | null = null;
  igrejaModalConfirm: string | null = null;

  //construtor --------------------------------------------------------
  constructor(
    private listaIgrejaService: ListaIgrejaService,
    private getEstatisticaService: GetEstatisticaService,
    private getMatrizService: GetMatrizService,
    private atualizarMatrizService: AtualizarMatrizService,
    private removerIgrejaService: RemoverIgrejaService,
    private router: Router,
    private cd: ChangeDetectorRef
  ){};

  //ready -------------------------------------------------------------
  ngOnInit(): void {
    const id = window.sessionStorage.getItem('paroquia_id');
    this.paroquia_id = id ? Number(id) : null;
    if (this.paroquia_id != null) {
      this.getListaIgreja(this.paroquia_id);
      this.eventosGerais(this.paroquia_id);
    } else {
      console.error('Paroquia ID não encontrado');
    }
  }

  //serviços ----------------------------------------------------------
  eventosGerais(paroquia_id: number): void{
    this.getEstatisticaService.getEstatistica(paroquia_id).subscribe({
      next: (response) => {
        if (response.status == 1){
          this.eventos = response.estatistica;
        }else {
          console.error('Status da resposta diferente de 1');
          // Exibir mensagem para o usuário
        }
      },
      error: (error) => {
        console.error('Erro ao carregar estatísticas:', error);
      }
    })
  }

  getListaIgreja(paroquia_id: number): void{
    this.listaIgrejaService.getListaIgreja(paroquia_id).subscribe({
      next: (response: any[]) => {
        this.igrejas = response;
      },
      error: (error) => {
        console.error('Erro na autenticação:', error);
      }
    })
  }

  getExisteMatriz(igrejaNome: string, id: number){
    const paroquiaId = window.sessionStorage.getItem('paroquia_id');
    if (this.selectedIgrejaName != null) {
      this.getMatrizService.getMatriz(Number(paroquiaId)).subscribe({
        next: (response) => {
          if (response.status == '1'){
            const matriz = response.matriz.igreja_nome;
            this.closeModal();
            this.openModalConfirm();
            this.igrejaModalConfirm = igrejaNome;
            this.matrizModalConfirm = matriz;
          }
        },
        error: (error) => {
          console.error('Erro ao verificar matriz:', error);
        }
      })
    } else {
      console.warn('selectedIgrejaName é null.');
    }
  }


  atualizar_matriz(){
    const paroquiaId = window.sessionStorage.getItem('paroquia_id');
    const igrejaId = this.selectedIgrejaId;
    if (igrejaId != null){
      this.atualizarMatrizService.getAtualizarMatriz(igrejaId, Number(paroquiaId)).subscribe({
        next: (response) => {
          if (response.status == '1'){
            this.closeModalConfirm();
            this.getListaIgreja(this.paroquia_id!);
          }
        },
        error: (error) => {
          console.error('Erro ao verificar matriz:', error);
        }
      })
    } else{
      console.warn('IgrejaId é null.');
    }
  }

  remover(){
    const igrejaId = this.selectedIgrejaId;
    this.removerIgrejaService.getRemoverIgreja(igrejaId!).subscribe({
      next: (response) => {
        if (response.status == 1){
          this.closeModalRemove();
          this.getListaIgreja(this.paroquia_id!);
        }
      },
      error: (error) => {
        console.error('Erro na autenticação:', error);
      }
    })
  }

  //funções ----------------------------------------------------------
  toggleAccordion(comunidade: any) {
    // Alternar o estado expandido da comunidade
    comunidade.expanded = !comunidade.expanded;
  
    // Fechar outras comunidades de outras igrejas, se necessário
    this.igrejas.forEach((igreja: any) => {
      igreja.listabycat.forEach((comunidadeItem: any) => {
        if (comunidadeItem !== comunidade) {
          comunidadeItem.expanded = false;  // Fechar as outras comunidades
        }
      });
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openModal(igrejaId: number, igrejaName: string, igrejaTipo: string) {
    this.selectedIgrejaId = igrejaId;
    this.selectedIgrejaName = igrejaName;
    this.showOptionsModal = igrejaTipo !== 'PARÓQUIA';
    this.showModal = true;
  }

  openModalConfirm(){
    this.showModalConfirm = true;
  }

  openModalRemove(){
    this.showModalRemove = true;
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.showOptionsModal = false;
  }

  closeModalConfirm(){
    this.showModalConfirm = false;
  }

  closeModalRemove(){
    this.showModalRemove = false;
  }

  criarIgreja(): void{
    window.sessionStorage.setItem('igreja_id', '');
    this.router.navigate(['/criar-igreja']);
  }

  calendario(){
    if (this.selectedIgrejaId) {
      window.sessionStorage.setItem('igreja_id', this.selectedIgrejaId.toString());
      this.router.navigate(['/calendario']);
    } else {
      console.error('selectedIgrejaId is not set.');
    }
  }

  configurarPerfil(){
    if (this.selectedIgrejaId) {
      window.sessionStorage.setItem('igreja_id', this.selectedIgrejaId.toString());
      this.router.navigate(['/configurar-perfil-igreja']);
    } else {
      console.error('selectedIgrejaId is not set.');
    }
  }
}


