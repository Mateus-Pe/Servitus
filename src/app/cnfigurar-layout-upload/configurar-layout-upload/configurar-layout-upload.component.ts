import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faCheck, faImage, faEye, faGear } from '@fortawesome/free-solid-svg-icons';
import { TinyEditorComponent } from '../../tiny-editor/tiny-editor.component';

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

  constructor(private router: Router){}

  teste(conteudo: string){
    console.log(conteudo);
  }
}
