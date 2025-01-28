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
  //var ions ------------------------------------------
  faArrowLeft = faArrowLeft;
  faCheck = faCheck;
  faChurch = faChurch;
  faEarthAmericas = faEarthAmericas;
  faMapLocationDot = faMapLocationDot;
  faFlag = faFlag;
  faLocationDot = faLocationDot;
  faHouse = faHouse;
  //var focus controle --------------------------------
  @ViewChild('nomeInput') nomeInput!: ElementRef;
  @ViewChild('cepInput') cepInput!: ElementRef;
  @ViewChild('cidadeInput') cidadeInput!: ElementRef;
  @ViewChild('bairroInput') bairroInput!: ElementRef<HTMLInputElement>;
  @ViewChild('logradouroInput') logradouroInput!: ElementRef;
  @ViewChild('numeroInput') numeroInput!: ElementRef;

  inputsDesabilitados: boolean = false;

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
  cepValido: boolean = false;

  errorMessage = '';

  isCityInputFocused = false;
  showOtherInputs = true;
  //var services ----------------------------
  paroquiaId: string | null = null;
  igrejaId: string | null = null;

  cidades: any[] = [];
  cidadesFiltradas: any[] = [];

  //construtor ----------------------------------------------------------------
  constructor(private geoLocationService: GeoLocationService,
              private incluirIgrejaService: IncluirIgrejaService,
              private cidadeService: CidadeService,
              private ajaxCepService: AjaxCepService,
              private router: Router
  ){};

  //ready --------------------------------------------------------------------
  ngOnInit() {
    this.paroquiaId = window.sessionStorage.getItem('paroquia_id');
    this.igrejaId = window.sessionStorage.getItem('igreja_id');
    this.getCidades();
  }

  //serviços ----------------------------------------------------------------
  getGeoLocation(){
    if (this.nomeInstituicao == ''){
      this.errorMessage = 'Para prosseguir coloque uma instituição';
      return;
    }else if (this.cepInstituicao == ''){
      this.errorMessage = 'Para prosseguir coloque o CEP';
      return;
    }else if (this.cepInstituicao.toString().length != 8){
      this.errorMessage = 'Para prosseguir corrija o CEP';
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
          this.getSalvar(location);
        } else {
          console.error('Nenhum resultado encontrado.');
        }
      },
      error: (error) => {
        console.error('Erro ao obter geolocalização:', error);
      }
    })
  }

  async buscarCep(): Promise<void> {
    if (this.cepInstituicao && this.cepInstituicao.toString().length == 8) {
      return new Promise((resolve) => {
        this.ajaxCepService.ajaxCep(this.cepInstituicao).subscribe({
          next: (response) => {
            if (response && response.erro !== "true") {
              // CEP encontrado, preenchendo os campos
              this.cidadeInstituicao = response.localidade;
              this.bairroInstituicao = response.bairro;
              this.logradouroInstituicao = response.logradouro;
  
              const cidadeEncontrada = this.cidades.find(
                cidade => cidade.name === response.localidade && cidade.uf === response.uf
              );
  
              if (cidadeEncontrada) {
                this.cidadeIdInstituicao = cidadeEncontrada.id;
              } else {
                console.warn("Cidade não implementada no Servitus");
              }
  
              this.cepValido = true;
              this.inputsDesabilitados = true;
            } else {
              this.cepValido = false;
              this.inputsDesabilitados = false;
            }
            resolve();  // Indica que a busca foi concluída
          },
          error: (error) => {
            console.error('Erro ao buscar o CEP:', error);
            this.cepValido = false;
            this.inputsDesabilitados = false;
            resolve();  // Indica que a busca foi concluída
          }
        });
      });
    } else {
      this.cepValido = false;
      this.inputsDesabilitados = false;
      return Promise.resolve();
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

  //funções ------------------------------------------------------------------
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

    setTimeout(() => {
      if (this.bairroInput && this.bairroInput.nativeElement) {
        this.bairroInput.nativeElement.focus();
      }
    }, 0);
  }


  async moveToNextInput(targetIndex: number) {
    switch (targetIndex) {
      case 0:
        this.cepInput.nativeElement.focus();
        break;
      case 1:
        await this.buscarCep();
        if (this.cepValido) {
          setTimeout(() => {
            this.numeroInput.nativeElement.focus();
          }, 0);
        } else {
          this.cidadeInput.nativeElement.focus();
        }
        break;
      case 2:
        if (this.bairroInstituicao || !this.cepValido) {
          this.bairroInput.nativeElement.focus();
        }
        break;
      case 3:
        if (this.logradouroInstituicao || !this.cepValido) {
          this.logradouroInput.nativeElement.focus();
        }
        break;
      case 4:
        this.numeroInput.nativeElement.focus();
        break;
      default:
        break;
    }
  }
  

  onCityInputFocus() {
    this.isCityInputFocused = true;
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
