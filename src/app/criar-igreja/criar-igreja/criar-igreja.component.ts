import { Component, ElementRef, ViewChild, QueryList, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faCheck, faChurch, faEarthAmericas, faMapLocationDot, faFlag, faLocationDot, faHouse } from '@fortawesome/free-solid-svg-icons';
import { GeoLocationService } from '../../services/api-geolocation/api-geolocation.service';
import { IncluirIgrejaService } from '../../services/incluir_igreja/incluir-igreja.service';
import { CidadeService } from '../../services/cidades_temp/cidades-temp.service';
import { AjaxCepService } from '../../services/ajaxCep/ajax-cep.service';

@Component({
  selector: 'app-criar-igreja',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, CommonModule],
  templateUrl: './criar-igreja.component.html',
  styleUrl: './criar-igreja.component.scss'
})
export class CriarIgrejaComponent {
  faArrowLeft = faArrowLeft;
  faCheck = faCheck;
  faChurch = faChurch;
  faEarthAmericas = faEarthAmericas;
  faMapLocationDot = faMapLocationDot;
  faFlag = faFlag;
  faLocationDot = faLocationDot;
  faHouse = faHouse;

  @ViewChild('nomeInput') nomeInput!: ElementRef;
  @ViewChild('cepInput') cepInput!: ElementRef;
  @ViewChild('cidadeInput') cidadeInput!: ElementRef;
  @ViewChild('bairroInput') bairroInput!: ElementRef<HTMLInputElement>;
  @ViewChild('logradouroInput') logradouroInput!: ElementRef;
  @ViewChild('numeroInput') numeroInput!: ElementRef;

  nomeInstituicao = '';
  cepInstituicao = '';
  cidadeInstituicao = '';
  bairroInstituicao = '';
  logradouroInstituicao = '';
  numeroInstituicao = '';
  cidadeIdInstituicao = '';
  logoInstituicao = '';
  igrejaMatriz = '0';
  nomeResumido = '';

  errorMessage = '';

  isCityInputFocused = false;
  showOtherInputs = true;

  paroquiaId: string | null = null;
  igrejaId: string | null = null;

  cidades: any[] = [];
  cidadesFiltradas: any[] = [];

  constructor(private geoLocationService: GeoLocationService,
              private incluirIgrejaService: IncluirIgrejaService,
              private cidadeService: CidadeService,
              private ajaxCepService: AjaxCepService,
              private router: Router
  ){}

  ngOnInit() {
    this.paroquiaId = window.sessionStorage.getItem('paroquia_id');
    this.igrejaId = window.sessionStorage.getItem('igreja_id');
    this.getCidades();
  }

  getGeoLocation(){

    if (this.nomeInstituicao == ''){
      this.errorMessage = 'Para prosseguir coloque uma instituição';
      return;
    }else if (this.cepInstituicao == ''){
      this.errorMessage = 'Para prosseguir coloque o CEP';
      return;
    }else if (this.cepInstituicao.toString().length != 8){
      this.errorMessage = 'Para prosseguir corrija o CEP';
      console.log(this.cepInstituicao.toString().length);
      return;
    }else if (this.cidadeIdInstituicao == ''){
      this.errorMessage = 'Para prosseguir coloque a cidade';
      return;
    }else if (this.bairroInstituicao == ''){
      this.errorMessage = 'Para prosseguir coloque o bairro';
      return;
    }else if (this.logradouroInstituicao == ''){
      this.errorMessage = 'Para prosseguir coloque um logradouro';
      return;
    }else{
      this.errorMessage = '';
    }

    const address = this.getAddress();
    this.geoLocationService.apiGeoLocation(address).subscribe({
      next: (location) => {
        if (location){
          console.log('Latitude:', location.lat);
          console.log('Longitude:', location.lng);
          this.getSalvar(location);
          console.log('Logradouro:', this.logradouroInstituicao);
        } else {
          console.error('Nenhum resultado encontrado.');
        }
      },
      error: (error) => {
        console.error('Erro ao obter geolocalização:', error);
      }
    })
  }

  buscarCep() {
    if (this.cepInstituicao && this.cepInstituicao.toString().length == 8) {
      this.ajaxCepService.ajaxCep(this.cepInstituicao).subscribe({

        next: (response) => {
          if (response != null) {
            console.log(response);
            console.log(response.error);
            if (response.erro == "true"){
              console.log("caiu aqui");
              this.moveToNextInput(2);
            }else{
              console.log("ta aqui bixo");
              // CEP encontrado, preenchendo os campos
              this.cidadeInstituicao = response.localidade;
              this.bairroInstituicao = response.bairro;
              this.logradouroInstituicao = response.logradouro;

              const cidadeEncontrada = this.cidades.find(
                cidade => cidade.name === response.localidade && cidade.uf === response.uf
              );
              
              if (cidadeEncontrada) {
                this.cidadeIdInstituicao = cidadeEncontrada.id;
                console.log("ID da cidade encontrado:", this.cidadeIdInstituicao);
              }else{
                console.warn("Cidade não implementada no Servitus");
              }

              // Move o foco para o campo 'numeroInstituicao'
              setTimeout(() => {
                this.moveToNextInput(4);
              }, 0);
            }
          } else {
            // Move o foco para o campo 'cidadeInstituicao'
            
            this.moveToNextInput(2);
          }
        },
        error: (error) => {
          console.error('Erro ao buscar o CEP:', error);
        }
      });
    }
  }

  getCidades() {
    this.cidadeService.getCidades('12').subscribe(data => {
      this.cidades = data;
      this.cidadesFiltradas = data;
    });
  }

  getSalvar(location: {lat: number, lng: number}){

    this.incluirIgrejaService.incluirIgreja(
                                            +this.cepInstituicao,
                                            this.logradouroInstituicao,
                                            +this.numeroInstituicao,
                                            this.bairroInstituicao,
                                            this.cidadeInstituicao,
                                            +this.cidadeIdInstituicao,
                                            location.lat,
                                            location.lng,
                                            this.nomeInstituicao,
                                            this.logoInstituicao,
                                            +this.igrejaMatriz,
                                            +this.paroquiaId!,
                                            this.nomeResumido



    ).subscribe({
      next: (response) => {
        if (response.status == '1'){
          window.sessionStorage.setItem('igreja_desc', this.nomeResumido);
          window.sessionStorage.setItem('igreja_id', response.igreja_id);
          console.log("mudando para criar igreja");
          this.router.navigate(['/lista-igreja']);
        } else{
          console.error('Erro ao incluir igreja:', response);
        }
      },
      error: (error) => {
        console.error('Erro ao incluir igreja:', error);
      }
    })
  }






  getAddress(): string {
    let address = this.logradouroInstituicao;
    if (this.numeroInstituicao) {
      address += ' ' + this.numeroInstituicao;
    }
    address += ', ' + this.bairroInstituicao;
    address += ', ' + this.cidadeInstituicao;
    return address;
  }


  onCidadeChange(event: any) {
    const valor = event.target.value;
    if (valor.length >= 2) {
      this.cidadesFiltradas = this.cidades.filter(cidade =>
        cidade.name.toLowerCase().includes(valor.toLowerCase())
      );
    } else {
      this.cidadesFiltradas = this.cidades; // Mostra todas as cidades se o input tiver menos de 2 caracteres
    }
  }

  selecionarCidade(cidade: any):void {
    const cidadeId = cidade.id; // Define a cidadeId
    this.cidadeIdInstituicao = cidadeId;
    const cidadeNome = cidade.name; // Define o nome da cidade
    this.cidadeInstituicao = cidade.name;
    this.isCityInputFocused = false;
    this.showOtherInputs = true;

    console.log('Cidade selecionada:', cidadeNome, 'ID:', cidadeId);
    setTimeout(() => {
      if (this.bairroInput && this.bairroInput.nativeElement) {
        this.bairroInput.nativeElement.focus();
      }
    }, 0);
  }


  moveToNextInput(targetIndex: number) {
    switch (targetIndex) {
      case 0:
        this.cepInput.nativeElement.focus();
        break;
      case 1:
        // Verifica se o campo 'cidadeInstituicao' já foi preenchido
        if (this.cidadeInstituicao) {
          this.cidadeInput.nativeElement.focus();
        } else {
          // Se não estiver preenchido, chama a função de busca de CEP
          this.buscarCep(); // Isso vai preencher o campo 'cidadeInstituicao' se o CEP for válido
        }
        break;
      case 2:
        // Verifica se o campo 'bairroInstituicao' já foi preenchido
        if (this.bairroInstituicao) {
          this.bairroInput.nativeElement.focus();
        }
        break;
      case 3:
        // Verifica se o campo 'logradouroInstituicao' já foi preenchido
        if (this.logradouroInstituicao) {
          this.logradouroInput.nativeElement.focus();
        }
        break;
      case 4:
        // Verifica se o campo 'numeroInstituicao' já foi preenchido
        if (this.numeroInstituicao) {
          this.numeroInput.nativeElement.focus();
        }
        break;
      default:
        break;
    }
  }
  

  onCityInputFocus() {
    this.isCityInputFocused = true; // Define que o input de cidade está focado
    this.showOtherInputs = false;
  }

  igrejaDescResumida(nome: string): string {
    const palavrasARemover = [
      "santuário", "santuario", "paróquia", "paroquia", "catedral", "comunidade",
      "basílica", "basilica", "capéla", "capela", "igreja", "templo",
      "oratório", "oratorio", "mosteiro", "matriz", "de", "da", "das", "do", "dos"
    ];

    const partesNome = nome.split(" ");
    const palavrasNecessarias = partesNome.filter(palavra => 
      !palavrasARemover.includes(palavra.toLowerCase())
    );

    let nomeAbreviado = "";
    const strPalNec = palavrasNecessarias.join(" ");

    if (strPalNec.length < 20) {
      nomeAbreviado = strPalNec;
    } else {
      for (const palavra of partesNome) {
        if (!palavrasARemover.includes(palavra.toLowerCase())) {
          if (palavra.toLowerCase() === "nossa") {
            nomeAbreviado += "N.";
          } else if (palavra.toLowerCase() === "senhora" || palavra.toLowerCase() === "santo" || palavra.toLowerCase() === "são") {
            nomeAbreviado += "S.";
          } else {
            nomeAbreviado += " " + palavra;
          }
        }
      }
    }
    nomeAbreviado = nomeAbreviado.replace(/\.\s+/g, ".");
    return nomeAbreviado.trim(); // Remove espaços em branco desnecessários
  }

  resumeNome() {
    this.nomeResumido = this.igrejaDescResumida(this.nomeInstituicao);
    console.log(this.nomeResumido);
  }

  @HostListener('focusin', ['$event.target'])
  onFocus(target: HTMLElement) {
    if (target.id === 'nome_instituicao' ||
        target.id === 'cep_instituicao' ||
        target.id === 'bairro_instituicao' ||
        target.id === 'logradouro_instituicao' ||
        target.id === 'numero_instituicao' || 
        target.id === 'cidade_instituicao'
      ) {
      this.errorMessage = '';
    }
  }

  voltarLista(){
    this.router.navigate(['/lista-igreja']);
  }

}
