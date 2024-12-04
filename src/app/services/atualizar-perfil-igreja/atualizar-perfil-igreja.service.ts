import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtualizarPerfilIgrejaService {
  atualizarPerfilIgrejaUrl = 'https://pedeoferta.com.br/templo/index.php/welcome/atualizar_perfil_igreja';
  constructor(private http: HttpClient) { }

  getAtualizarPerfilIgreja(igrejaId: number,
                           igrejaNome: string,
                           igrejaWhats: string,
                           igrejaFace: string,
                           igrejaInsta: string,
                           igrejaEmail: string,
                           horarioFixo: string,
                           fileFundo: File,
                           imagemVemDoBanco: boolean,
                           imagemIgrejaUrl: string,
                           fileImagemIgreja: File,
  ): Observable<any>{
    const formData = new FormData();
    formData.append('igreja_id', igrejaId.toString());
    formData.append('igreja_nome', igrejaNome);
    formData.append('igreja_whats', igrejaWhats);
    formData.append('igreja_face', igrejaFace);
    formData.append('igreja_instagram', igrejaInsta);
    formData.append('igreja_email', igrejaEmail);
    formData.append('igreja_horario_fixo', horarioFixo);
    formData.append('file_background', fileFundo);
    if (imagemVemDoBanco){
      formData.append('banco_imagem', imagemIgrejaUrl);
    }else{
      formData.append('file', fileImagemIgreja);
    }

    return this.http.post<any>(this.atualizarPerfilIgrejaUrl, formData);
  }
}
