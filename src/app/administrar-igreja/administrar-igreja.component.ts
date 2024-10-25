import { Component, OnInit, Input  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetListaParoquiaService } from '../services/get-lista-paroquia/get-lista-paroquia.service';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faPenToSquare, faPlus, faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-administrar-igreja',
  standalone: true,
  imports: [ CommonModule, FontAwesomeModule ],
  templateUrl: './administrar-igreja.component.html',
  styleUrl: './administrar-igreja.component.scss'
})
export class AdministrarIgrejaComponent implements OnInit {
  faPenToSquare = faPenToSquare;
  faUserPlus = faUserPlus;
  faLocationDot = faLocationDot;
  faPlus = faPlus;
  @Input() igrejas: any[] = [];
  cidadeId = 9240;

  constructor(private getListaParoquiaService: GetListaParoquiaService, private router: Router){}

  ngOnInit(): void {
    this.getParoquias();
  }

  getParoquias(): void{
    this.getListaParoquiaService.getParoquia(this.cidadeId).subscribe({
      next: (response) => {
        console.log(response);
        this.igrejas = response;
      },
      error: (error) => {
        console.error('Erro na autenticação:', error);
      }
    })
  }



  toggleAccordion(paroquia: any) {
    paroquia.expanded = !paroquia.expanded;
  }

  toggleDetalhes(comunidade: any) {
    comunidade.expanded = !comunidade.expanded;
  }
}
