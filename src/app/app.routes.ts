import { Routes } from '@angular/router';
import { LoginasComponent } from './loginas/loginas.component';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { ConfirmarSenhaComponent } from './confirmar-senha/confirmar-senha/confirmar-senha.component';
import { CriarIgrejaComponent } from './criar-igreja/criar-igreja/criar-igreja.component';
import { AdministrarIgrejaComponent } from './administrar-igreja/administrar-igreja.component';
import { ListaIgrejaComponent } from './lista-igreja/lista-igreja/lista-igreja.component';
import { CalendarioComponent } from './calendario/calendario/calendario.component';
import { EscolhaTipoAgendaComponent } from './escolha-tipo-agenda/escolha-tipo-agenda/escolha-tipo-agenda.component';
import { CriarAgendaEspecificaComponent } from './criar-agenda-especifica/criar-agenda-especifica/criar-agenda-especifica.component';
import { CriarAgendaRecorrenteComponent } from './criar-agenda-recorrente/criar-agenda-recorrente/criar-agenda-recorrente.component';
import { ConfigurarLayoutUploadComponent } from './cnfigurar-layout-upload/configurar-layout-upload/configurar-layout-upload.component';
import { ConfigurarPerfilIgrejaComponent } from './configurar-perfil-igreja/configurar-perfil-igreja/configurar-perfil-igreja.component';
import { EstadoComponent } from './estado/estado/estado.component';
import { CidadesComponent } from './cidades/cidades/cidades.component';
import { PrincipalComponent } from './principal/principal/principal.component';
import { CalendarioFeedComponent } from './calendario-feed/calendario-feed/calendario-feed.component';
import { PerfilIgrejaComponent } from './perfil-igreja/perfil-igreja/perfil-igreja.component';

export const routes: Routes = [
    { path: 'loginas', component: LoginasComponent },
    { path: 'esqueci-senha', component: EsqueciSenhaComponent },
    { path: 'confirmar-senha', component: ConfirmarSenhaComponent },
    { path: 'criar-igreja', component: CriarIgrejaComponent },
    { path: 'administrar-igreja', component: AdministrarIgrejaComponent },
    { path: 'lista-igreja', component: ListaIgrejaComponent },
    { path: 'calendario', component: CalendarioComponent },
    { path: 'escolha-tipo-agenda', component: EscolhaTipoAgendaComponent },
    { path: 'criar-agenda-especifica', component: CriarAgendaEspecificaComponent },
    { path: 'criar-agenda-recorrente', component: CriarAgendaRecorrenteComponent },
    { path: 'configurar-layout-upload', component: ConfigurarLayoutUploadComponent },
    { path: 'configurar-perfil-igreja', component: ConfigurarPerfilIgrejaComponent },
    { path: 'estado', component: EstadoComponent },
    { path: 'cidades', component: CidadesComponent },
    { path: 'principal', component: PrincipalComponent },
    { path: 'calendario-feed', component: CalendarioFeedComponent },
    { path: 'perfil-igreja', component: PerfilIgrejaComponent},
    { path: '', redirectTo: '/loginas', pathMatch: 'full' }
];
