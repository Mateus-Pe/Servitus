import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtualizarLayoutAgendaUploadService {
  private atualizarLayoutUploadUrl = 'https://pedeoferta.com.br/templo/index.php/welcome/atualizar_layout_agenda_upload';

  constructor(private http: HttpClient) { }

  atualizarLayoutAgendaUpload(agendaId: number,
                               conteudoHtml: string,
                               flagLote: number,
                               imagemSrc: string,
                               file: File,  // Certifique-se de que 'file' é do tipo 'File'
                               origemImagem: string): Observable<any> {

    const formData = new FormData();
    formData.append('agenda_id', agendaId.toString());
    formData.append('agenda_layout_upload_desc', conteudoHtml);
    formData.append('flag_lote', flagLote.toString());
    if (origemImagem == 'L') {
      formData.append('imagem_src', imagemSrc);
    } else {
      formData.append('file', file);  // Aqui, adiciona o arquivo como 'file'
    }
    formData.append('origem_imagem', origemImagem);

    // Não é necessário setar 'Content-Type' para 'multipart/form-data', o HttpClient faz isso automaticamente
    return this.http.post<any>(this.atualizarLayoutUploadUrl, formData);
  }
}
