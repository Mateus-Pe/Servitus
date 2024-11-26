import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditorComponent } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-tiny-editor',
  standalone: true,
  imports: [EditorComponent, FormsModule, CommonModule],
  template: `
    <editor
      apiKey="txixhs2kyot0muep1k6v2mp5hd6wqk30jmbvp6hv8pk3g4b7"
      [init]="editorConfig"
      placeholder="Descrição"
      [(ngModel)]="content"
      id="descricao2"
    ></editor>
  `,
  styles: [`
    .descricao-output {
      display: inline;
      opacity: 1;
    }
  `]
})
export class TinyEditorComponent implements OnInit {
  @Input() agenda: any;
  @Output() keyup = new EventEmitter<string>();
  content: string = '';
  editorConfig: any;

  ngOnInit() {
    // Inicializa o conteúdo com a descrição da agenda se existir
    if (this.agenda?.agenda_layout_upload_desc) {
      this.content = this.agenda.agenda_layout_upload_desc;
    }

    // Configura o editor
    this.editorConfig = {
      apiKey: 'txixhs2kyot0muep1k6v2mp5hd6wqk30jmbvp6hv8pk3g4b7',
      height: 120,
      plugins: [],
      placeholder: 'Descrição',
      toolbar: 'undo redo | fontselect fontsizeselect | forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | removeformat | code',
      fontsize_formats: '8px 10px 12px 14px 18px 24px 36px',
      content_style: 'body { font-family: Arial, Helvetica, sans-serif; font-size: 14px; }',
      setup: (editor: any) => {
        editor.on('init', () => this.initializeEditor(editor));
        editor.on('keyup change', () => this.updatePreview(editor));
      }
    };
  }

  // Inicializa o editor, removendo a barra de status
  initializeEditor(editor: any): void {
    const statusbarDiv = document.querySelector('.tox .tox-statusbar');
    if (statusbarDiv) {
      statusbarDiv.remove();
    }
  }

  // Atualiza a visualização no componente pai
  updatePreview(editor: any): void {
    const conteudoHtml = editor.getContent();
    this.keyup.emit(conteudoHtml);
  }

  // Atualiza o valor da agenda com o conteúdo do editor
  onModelChange(content: string): void {
    this.agenda.agenda_layout_upload_desc = content;
  }
}
