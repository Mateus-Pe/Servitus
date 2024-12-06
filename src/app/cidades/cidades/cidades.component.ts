import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { GetCitiesPdoService } from '../../services/get-cities-pdo/get-cities-pdo.service';

@Component({
  selector: 'app-cidades',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './cidades.component.html',
  styleUrl: './cidades.component.scss'
})
export class CidadesComponent {

  constructor(private getCitiesPdoService: GetCitiesPdoService,
              private router: Router
  ){}

  faSearch = faSearch;

  cidades: any[] = [];
  cidadesFiltradas: any[] = [];
  pesquisa: string = '';
  uf: string | null = null;
  origem: string | null = null;

  ngOnInit(): void {
    this.origem = sessionStorage.getItem('origem');
    this.uf = sessionStorage.getItem('uf');

    this.getCidades();
  }

  getCidades(){
    this.getCitiesPdoService.getCities(this.uf!).subscribe({
      next: (response) => {
        this.cidades = response;
        this.cidadesFiltradas = [...this.cidades];
      },
      error: (error) => {
        console.error("erro ao carregar as cidades: ", error);
      }
    })
  }

  search(){
    const valorInput = this.pesquisa.trim().toLowerCase();

    if (valorInput.length >= 3) {
      this.cidadesFiltradas = this.cidades.filter((cidade) =>
        cidade.name.toLowerCase().includes(valorInput)
      );
      window.scrollTo(0, 0);
    } else {
      this.cidadesFiltradas = [...this.cidades];
    }
  }

  selectCity(cidade: any): void{
    sessionStorage.setItem('cidade_id', cidade.id);
    sessionStorage.setItem('cidade_nome', cidade.nickname);
    
    if (this.origem === 'feed' || this.origem === 'administrar-igreja') {
      this.router.navigate([`/${this.origem}`]);
    } else {
      this.router.navigate(['/estado']);
    }
  }

}
