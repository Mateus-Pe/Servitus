import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditorComponent } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-tiny-editor',
  standalone: true,
  imports: [EditorComponent, FormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <editor
      apiKey="txixhs2kyot0muep1k6v2mp5hd6wqk30jmbvp6hv8pk3g4b7"
      [init]="configuracaoEditor"
      [(ngModel)]="conteudo"
      id="descricao2"
    ></editor>
  `,
  styles: [` .descricao-output { display: inline; opacity: 1; } `]
})
export class TinyEditorComponent implements OnInit, OnChanges {
  @Input() descricao: string = ''; // O valor inicial para evitar problemas
  @Input() editorHeight: number = 120;
  @Input() placeholder: string = '';
  @Output() keyup = new EventEmitter<string>();

  conteudo: string = ''; // Ligação do conteúdo com o editor
  instanciaEditor: any;  // Referência ao editor TinyMCE
  configuracaoEditor: any; // Configuração do editor

  ngOnInit() {
    this.configuracaoEditor = {
      height: this.editorHeight,
      plugins: ['advlist', 'autolink', 'link', 'lists', 'charmap', 'preview', 'anchor', 
      'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'fullscreen', 
      'insertdatetime', 'media', 'table', 'help', 'emoticons'], // Adicione os plugins que quiser
      toolbar: 'undo redo | fontselect fontsizeselect | forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | removeformat | code | fullscreen',
      placeholder: this.placeholder,
      fontsize_formats: '8px 10px 12px 14px 18px 24px 36px',
      content_style: 'body { font-family: Arial, Helvetica, sans-serif; font-size: 14px; }',
      statusbar: false, // Remove a barra de status
      setup: (editor: any) => {
        this.instanciaEditor = editor;
        // Remove a barra de status quando o editor for inicializado
        editor.on('init', () => this.inicializarEditor(editor));
        editor.on('init', () => {
          // Inicializa o conteúdo apenas se o editor ainda estiver vazio
          if (!editor.getContent()) {
            editor.setContent(this.descricao); // Se não tiver conteúdo, coloca a descrição inicial
          }
        });
        // Captura eventos de teclado e mudança de conteúdo
        editor.on('input change', () => this.atualizarPreview(editor));
      }
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['descricao'] && this.instanciaEditor) {
      const novaDescricao = changes['descricao'].currentValue;
      // Atualiza o conteúdo apenas se o editor estiver vazio
      if (this.instanciaEditor.getContent() === '') {
        this.instanciaEditor.setContent(novaDescricao); // Define o conteúdo inicial se estiver vazio
        this.conteudo = novaDescricao; // Atualiza a variável conteudo
      }
    }
  }

  inicializarEditor(editor: any): void {
    // Remove a barra de status de forma programática (apenas se ainda existir)
    const statusbarDiv = document.querySelector('.tox .tox-statusbar');
    if (statusbarDiv) statusbarDiv.remove();
  }

  atualizarPreview(editor: any): void {
    const conteudoHtml = editor.getContent();
    this.keyup.emit(conteudoHtml); // Emite o conteúdo para o componente pai
  }
}
