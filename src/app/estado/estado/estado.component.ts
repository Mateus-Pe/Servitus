import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estado',
  standalone: true,
  imports: [],
  templateUrl: './estado.component.html',
  styleUrl: './estado.component.scss'
})
export class EstadoComponent {

  constructor(private router: Router){}

  origem: string | null = null;

  ngOnInit(): void {
    this.origem = sessionStorage.getItem('origem');
  }

  onSelectEstado(uf: string): void {
    sessionStorage.setItem('uf', uf);
    if (this.origem) {
      sessionStorage.setItem('origem', this.origem);
    } else {
      console.warn('Origem não definida, não será salva.');
    }

    this.router.navigate(['/cidades']);
  }

}
