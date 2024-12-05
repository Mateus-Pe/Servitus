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
    console.log('Origem da navegação:', this.origem);
  }

  onSelectEstado(uf: string): void {
    sessionStorage.setItem('uf', uf);  // Salva o UF na sessão
    console.log(`UF selecionada: ${uf}`);
    // Aqui você pode navegar para a próxima tela de cidades, se necessário.
    if (this.origem) {
      sessionStorage.setItem('origem', this.origem);
      console.log('Origem salva:', this.origem);
    } else {
      console.warn('Origem não definida, não será salva.');
    }

    this.router.navigate(['/cidades']);
  }

}
