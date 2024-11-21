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

export const routes: Routes = [
    { path: 'loginas', component: LoginasComponent },
    { path: 'esqueci-senha', component: EsqueciSenhaComponent },
    { path: 'confirmar-senha', component: ConfirmarSenhaComponent},
    { path: 'criar-igreja', component: CriarIgrejaComponent},
    { path: 'administrar-igreja', component: AdministrarIgrejaComponent },
    { path: 'lista-igreja', component: ListaIgrejaComponent},
    { path: 'calendario', component: CalendarioComponent},
    { path: 'escolha-tipo-agenda', component: EscolhaTipoAgendaComponent},
    { path: 'criar-agenda-especifica', component: CriarAgendaEspecificaComponent},
    { path: 'criar-agenda-recorrente', component: CriarAgendaRecorrenteComponent},
    { path: '', redirectTo: '/loginas', pathMatch: 'full' }
];
