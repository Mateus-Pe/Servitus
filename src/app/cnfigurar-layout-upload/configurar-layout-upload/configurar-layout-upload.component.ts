import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faCheck, faImage, faEye, faGear } from '@fortawesome/free-solid-svg-icons';
import { TinyEditorComponent } from '../../tiny-editor/tiny-editor.component';
import { ModalComponent } from '../../modal/modal/modal.component';
import { UtilsService } from '../../utils/utils.service';
import { GetAgendaByIdService } from '../../services/get-agenda-by-id/get-agenda-by-id.service';
import { PreLoteService } from '../../services/pre_lote/pre-lote.service';
import { AtualizarLayoutAgendaUploadService } from '../../services/atualizar-layout-agenda-upload/atualizar-layout-agenda-upload.service';

@Component({
  selector: 'app-configurar-layout-upload',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule, TinyEditorComponent, ModalComponent],
  templateUrl: './configurar-layout-upload.component.html',
  styleUrl: './configurar-layout-upload.component.scss'
})
export class ConfigurarLayoutUploadComponent {
  // Var icons ---------------------------------------
  faXmark = faXmark;
  faCheck = faCheck;
  faImage = faImage;
  faEye = faEye;
  faGear = faGear;
  //Var display---------------------------------------
  editImg = false;
  visualizar = false;
  imagem = true;
  imagem_selecionada = false;

  showModalViewAgenda = false;
  showModalPreSalvar = false;
  showModalValidacao = false;
  //Var tiny------------------------------------------
  agenda = {
    agenda_layout_upload_desc: ''
  };
  //Var funções---------------------------------------
  agendaId: number | null = null;
  previewImgSrc: string | null = null;
  file: File | null = null;
  getAgendasReturn: any = {};
  origemImagem: string = ''; // U-upload; L-layout

  igrejaNome: string | null = null;
  igrejaLogoUrl: string | null = null;
  agendaDesc: SafeHtml = '';

  texto_modal: string = '';
  textoValidacao: string = '';
// var estilos modais---------------------------------
estiloModal = {
  'background-color': 'black'
};

estiloModalContent = {
  'width': '90%',
  'border-radius': '10px',
  'padding': 'unset',
  'text-align': 'unset'
};

  constructor(private getAgendaByIdService: GetAgendaByIdService,
              private preLoteService: PreLoteService,
              private atualizarLayoutAgendaUploadService: AtualizarLayoutAgendaUploadService,
              private utilsService: UtilsService,
              private sanitizer: DomSanitizer,
              private router: Router){}
//-----------------------------------Ready-------------------------------------------------
  ngOnInit() {
    const igrejaIdString = window.sessionStorage.getItem('agenda_id');
    this.agendaId = igrejaIdString ? Number(igrejaIdString) : null;
    this.agendaDesc = this.sanitizer.bypassSecurityTrustHtml('Adicione um comentário para visualiza-lo');
    console.log(this.agendaId);
    if (this.agendaId) {
      this.getAgenda();
    }
  }

//----------------------------------Services-----------------------------------------------
  getAgenda(){
    if (!this.agendaId) return;
    this.getAgendaByIdService.getAgendaById(this.agendaId).subscribe({
      next: (response) => {
        const agenda = response?.agenda;

        if (agenda) {
          // Atualiza os dados da agenda
          this.getAgendasReturn = agenda;
  
          this.igrejaLogoUrl = agenda.igreja_logo_url;
          this.igrejaNome = agenda.igreja_nome;
  
          // Atualiza os elementos da interface
          if (agenda.agenda_img) {
            this.imagem_selecionada = true;
            this.origemImagem = 'L';
  
            this.previewImgSrc = agenda.agenda_img;
            this.imagem = false;
            this.editImg = true;
            this.visualizar = true;
          } else {
            this.imagem_selecionada = false;
            this.imagem = true;
            this.editImg = false;
            this.visualizar = false;
          }
  
          if (agenda.agenda_layout_upload_desc && typeof agenda.agenda_layout_upload_desc == 'string') {
            this.agenda.agenda_layout_upload_desc = agenda.agenda_layout_upload_desc;
            if (this.agenda.agenda_layout_upload_desc) {
              this.agendaDesc = this.sanitizer.bypassSecurityTrustHtml(this.agenda.agenda_layout_upload_desc);
            } else {
              console.warn('O conteúdo da agenda está indefinido');
            }
          }
        }
      },
      error: (error) => {
        console.error("get agenda deu problema: ", error);
      }
    });
  }

  preSalvar(){
    this.preLoteService.getPreLote(this.agendaId!).subscribe({
      next: (response) => {
        var quantidade = response.agendas.length;
        if(quantidade > 0){ //lote
          if(this.verificaHistoricoStatus(response.agendas[0].agenda_historico_status)){ //já atualizou
            this.openModalPreSalvar();
            this.texto_modal = "<p><b>Já existem agendamentos:</b><br><br>";
            response.agendas.slice(0, 3).forEach((agenda: any) => {
              this.texto_modal += `${this.utilsService.dateText(this.utilsService.splitDateTime(agenda.agenda_horario).date)} às ${this.utilsService.timeFormat(this.utilsService.splitDateTime(agenda.agenda_horario).time, ':', true)}<br>`;
            });

            if (quantidade > 3) {
              this.texto_modal += `<br>E mais [${quantidade - 3}]</p><br>`;
            }
          }else{//primeira vez
            this.salvar(0);
          }
        }else{//especifica
          this.salvar(0);
        }
      },
      error: (err) => {
        console.error('Erro ao fazer a requisição:', err);
      }
    })
  }

  salvar(flagLote: number){
    this.atualizarLayoutAgendaUploadService.atualizarLayoutAgendaUpload(this.agendaId!,
                                                                        this.agenda.agenda_layout_upload_desc,
                                                                        flagLote,
                                                                        this.previewImgSrc!,
                                                                        this.file!,
                                                                        this.origemImagem

    ).subscribe({
      next: (response) => {
        if (response.status == '1'){
          this.router.navigate(['/calendario']);
        }
      },
      error: (err) => {
        console.error('Erro ao fazer a requisição:', err);
      }
    })
  }

//------------------------------------Funções----------------------------------------------

  verificaHistoricoStatus(strHistoricoStatus: string): boolean {
    if (strHistoricoStatus && strHistoricoStatus != '') {
      const arr = strHistoricoStatus.split(';');
      return arr.includes('2'); // já atualizou
    }
    return false;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string;

        // Validar as dimensões da imagem (opcional)
        const img = new Image();
        img.onload = () => {
          const height = img.height;
          const width = img.width;

          if (this.validarImagem(height, width)) {
            this.previewImgSrc = result;
            this.imagem_selecionada = true;
            this.imagem = false;
            this.editImg = true;
            this.visualizar = true;
            this.origemImagem = 'U';
          } else {
            alert('Imagem inválida. Verifique as dimensões.');
            this.imagem = true;
            this.editImg = false;
            this.visualizar = false;
          }
        };
        img.src = result;
      };
      this.file = file;
      console.log(this.file);
      reader.readAsDataURL(file);
    }
  }

  validarImagem(height: number, width: number): boolean{
    var retorno = true;
    //verificar se realmente vai utilizar estas validações
    /*if ((1.5 * width) > height && height > width) { // antes 1.33
        retorno = false;
    }
    if ((1.5 * height) > width && width > height) {// antes 1.8
        retorno = false;
    }*/
    if (height < 100 || width < 100){
      this.openModalValidacao();
      this.textoValidacao = 'Erro ao carregar a imagem, procure uma imagem com mais de 100 pixels.';
      retorno = false;
    }
    console.log(`Altura: ${height}, Largura: ${width}`);
    return retorno;
  }

  triggerFileInputClick(): void {
    const fileInput = document.getElementById('imageFileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  salvarLote(){
    this.salvar(1);
  }

  salvarEspecifica(){
    this.salvar(0);
  }

  validacao(){
    if (!this.previewImgSrc){
      this.openModalValidacao();
      this.textoValidacao = 'Erro ao compartilhar, selecione uma imagem.';
    }else{
      this.preSalvar();
    }
  }

  valTextArea(conteudo: string){
    this.agenda.agenda_layout_upload_desc = conteudo;
    this.agendaDesc = this.sanitizer.bypassSecurityTrustHtml(conteudo);
  }

  openModalViewAgenda(){
    this.showModalViewAgenda = true;
  }

  openModalPreSalvar(){
    this.showModalPreSalvar = true;
  }

  openModalValidacao(){
    this.showModalValidacao = true;
  }

  closeModalValidacao(){
    this.showModalValidacao = false;
  }

  closeModalPreSalvar(){
    this.showModalPreSalvar = false;
  }
  
  closeModalViewAgenda(){
    this.showModalViewAgenda = false;
  }

  backToCalendar(){
    this.router.navigate(['/calendario']);
  }
}
