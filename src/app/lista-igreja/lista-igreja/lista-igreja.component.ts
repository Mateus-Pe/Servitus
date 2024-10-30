import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faGear, faCircleChevronDown  } from '@fortawesome/free-solid-svg-icons';
import { ListaIgrejaService } from '../../services/lista_igreja/lista-igreja.service';
import { GetEstatisticaService } from '../../services/get-estatistica/get-estatistica.service'; 

@Component({
  selector: 'app-lista-igreja',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './lista-igreja.component.html',
  styleUrl: './lista-igreja.component.scss'
})
export class ListaIgrejaComponent implements OnInit {
  faPlus = faPlus;
  faGear = faGear;
  faCircleChevronDown = faCircleChevronDown;

  paroquia_id : number | null = null;
  igrejas: any[] = [];
  eventos: any = {};

  constructor(
    private listaIgrejaService: ListaIgrejaService,
    private getEstatisticaService: GetEstatisticaService
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


  toggleAccordion(igreja: any) {
    igreja.expanded = !igreja.expanded;
  }


  toggleMenu() {
    const mobileNav = document.querySelector('.mobile-nav') as HTMLElement; // Asserção de tipo
    if (mobileNav) {
      mobileNav.style.display = mobileNav.style.display === 'none' ? 'block' : 'none';
    }
  }
}


