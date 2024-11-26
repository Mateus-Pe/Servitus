import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faCheck, faImage, faEye, faGear } from '@fortawesome/free-solid-svg-icons';
import { TinyEditorComponent } from '../../tiny-editor/tiny-editor.component';
import { GetAgendaByIdService } from '../../services/get-agenda-by-id/get-agenda-by-id.service';

@Component({
  selector: 'app-configurar-layout-upload',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule, TinyEditorComponent],
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
  //Var tiny------------------------------------------
  agenda = {
    agenda_layout_upload_desc: ''
  };
  //Var funções---------------------------------------
  agendaId: number | null = null;
  previewImgSrc: string | null = null;
  getAgendasReturn: any = {};
  origemImagem: string = ''; // U-upload; L-layout

  constructor(private getAgendaByIdService: GetAgendaByIdService,
              private router: Router){}
//-----------------------------------Ready-------------------------------------------------
  ngOnInit() {
    const igrejaIdString = window.sessionStorage.getItem('agenda_id');
    this.agendaId = igrejaIdString ? Number(igrejaIdString) : null;
    console.log(this.agendaId);
    if (this.agendaId) {
      this.getAgenda();
    }
  }

//----------------------------------Services-----------------------------------------------
getAgenda(){
  if (!this.agendaId) return;

    this.getAgendaByIdService.getAgendaById(this.agendaId).subscribe((response) => {
      const agenda = response?.agenda;

      if (agenda) {
        // Atualiza os dados da agenda
        this.getAgendasReturn = agenda;

        // Atualiza os elementos da interface
        if (agenda.agenda_img) {
          this.imagem_selecionada = true;
          this.origemImagem = 'L';

          this.previewImgSrc = agenda.agenda_img;
        } else {
          this.imagem_selecionada = false;
        }

        if(agenda.agenda_layout_upload_desc != null && agenda.agenda_layout_upload_desc != ''){
          this.agenda = {
            agenda_layout_upload_desc: agenda.agenda_layout_upload_desc
          };
          console.log(this.agenda);
          this.valTextArea(agenda.agenda_layout_upload_desc);
        }
      }
    });
}

//------------------------------------Funções----------------------------------------------
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
            this.origemImagem = 'U';
          } else {
            alert('Imagem inválida. Verifique as dimensões.');
          }
        };
        img.src = result;
      };

      reader.readAsDataURL(file);
    }
  }

  validarImagem(height: number, width: number): boolean{
    var retorno = true;
    //verificar se realmente vai utilizar estas validações
    /*if ((1.5 * width) > height && height > width) { // antes 1.33
      $("#modalConfirmacao").show();
      texto_modal = "<p> Erro ao carregar a imagem, procure uma imagem com as dimensões de largura e altura próximas.</p><br>";
        $('#mensagem_modal').html(texto_modal);
        retorno = false;
    }
    if ((1.5 * height) > width && width > height) {// antes 1.8
      $("#modalConfirmacao").show();
      texto_modal = "<p> Erro ao carregar a imagem, procure uma imagem com as dimensões de largura e altura próximas.</p><br>";
        $('#mensagem_modal').html(texto_modal);
        retorno = false;
    }*/
    if (height < 100 || width < 100){
      console.log("muito pequeno");
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

  valTextArea(conteudo: string){
    this.agenda.agenda_layout_upload_desc = conteudo;
    console.log(conteudo);
  }

  backToCalendar(){
    this.router.navigate(['/calendario']);
  }
}
