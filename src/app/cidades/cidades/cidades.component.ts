import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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

  constructor(private getCitiesPdoService: GetCitiesPdoService){}

  faSearch = faSearch;

  cidades: any[] = [];
  uf: string | null = null;
  origem: string | null = null;

  ngOnInit(): void {
    this.origem = sessionStorage.getItem('origem');
    console.log('Origem da navegação:', this.origem);
    this.uf = sessionStorage.getItem('uf');
    console.log('UF:', this.uf);

    this.getCidades();
  }

  getCidades(){
    this.getCitiesPdoService.getCities(this.uf!).subscribe({
      next: (response) => {
        this.cidades = response;
      },
      error: (error) => {
        console.error("erro ao carregar as cidades: ", error);
      }
    })
  }

}
