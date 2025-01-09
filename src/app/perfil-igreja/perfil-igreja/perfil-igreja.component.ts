import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { GetIgrejaByIdService } from '../../services/get-igreja-by-id/get-igreja-by-id.service';

@Component({
  selector: 'app-perfil-igreja',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './perfil-igreja.component.html',
  styleUrl: './perfil-igreja.component.scss'
})
export class PerfilIgrejaComponent {
  igrejaId: number | null = null;

  igrejaPerfil: any = {};

  faArrowLeft = faArrowLeft;
  constructor(private getIgrejaByIdService: GetIgrejaByIdService,
              private router: Router)
  {}

  ngOnInit() {
    const igrejaIdString = window.sessionStorage.getItem('feed_igreja_id');
    this.igrejaId = igrejaIdString ? Number(igrejaIdString) : null;
    this.carregarIgreja();
  }

  //Services --------------------------------------------------------------------------
  carregarIgreja() {
    if (this.igrejaId != null) {
      this.getIgrejaByIdService.igrejaById(this.igrejaId).subscribe({
        next: (response) => {
          if (response.status == "1") {
            this.igrejaPerfil = response;
            console.log(this.igrejaPerfil);
          }
        },
        error: (error) => {
          console.error('Erro ao carregar a igreja', error);
        }
      });
    } else {
      console.error('igrejaId é null');
    }
  }
}
