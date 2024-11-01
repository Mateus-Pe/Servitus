import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faGear, faCircleChevronDown, faCalendar, faTrash, faChurch  } from '@fortawesome/free-solid-svg-icons';
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
  faPlus = faPlus;
  faGear = faGear;
  faCircleChevronDown = faCircleChevronDown;
  faCalendar = faCalendar;
  faTrash = faTrash;
  faChurch = faChurch

  paroquia_id : number | null = null;
  igrejas: any[] = [];
  eventos: any = {};

  selectedIgrejaId: number | null = null;
  selectedIgrejaName: string | null = null;

  showModal = false;
  showModalRemove = false;
  showModalConfirm = false;
  textoModalConfirm: string | null = null;
  matrizModalConfirm: string | null = null;
  igrejaModalConfirm: string | null = null;
  showTradeParoquia = false;

  isMenuOpen: boolean = false;

  constructor(
    private listaIgrejaService: ListaIgrejaService,
    private getEstatisticaService: GetEstatisticaService,
    private getMatrizService: GetMatrizService,
    private atualizarMatrizService: AtualizarMatrizService,
    private removerIgrejaService: RemoverIgrejaService,
    private router: Router,
    private cd: ChangeDetectorRef
  ){}

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

  eventosGerais(paroquia_id: number): void{
    this.getEstatisticaService.getEstatistica(paroquia_id).subscribe({
      next: (response) => {
        if (response.status == 1){
          this.eventos = response.estatistica;
          console.log(this.eventos);
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
        console.log(response);
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





  toggleAccordion(igreja: any) {
    igreja.expanded = !igreja.expanded;
  }


  toggleMenu() {
    const mobileNav = document.querySelector('.mobile-nav') as HTMLElement;
    //mobileNav.classList.toggle('active');
    console.log("clicou");
    this.isMenuOpen = !this.isMenuOpen;
    this.cd.detectChanges();
    console.log("Menu toggle:", this.isMenuOpen);
  }


  criarIgreja(): void{
    window.sessionStorage.setItem('igreja_id', '');
    this.router.navigate(['/criar-igreja']);
  }

  openModal(igrejaId: number, igrejaName: string, igrejaTipo: string) {
    this.selectedIgrejaId = igrejaId;
    this.selectedIgrejaName = igrejaName;
    this.showTradeParoquia = igrejaTipo !== 'PARÓQUIA';
    this.showModal = true;
    console.log(this.selectedIgrejaId);
    console.log(this.selectedIgrejaName);
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
    this.showTradeParoquia = false;
  }

  closeModalConfirm(){
    this.showModalConfirm = false;
  }

  closeModalRemove(){
    this.showModalRemove = false;
  }
}


