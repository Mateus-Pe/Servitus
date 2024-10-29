import { Routes } from '@angular/router';
import { LoginasComponent } from './loginas/loginas.component';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { ConfirmarSenhaComponent } from './confirmar-senha/confirmar-senha/confirmar-senha.component';
import { AdministrarIgrejaComponent } from './administrar-igreja/administrar-igreja.component';

export const routes: Routes = [
    { path: 'loginas', component: LoginasComponent },
    { path: 'esqueci-senha', component: EsqueciSenhaComponent },
    { path: 'confirmar-senha', component: ConfirmarSenhaComponent},
    { path: 'administrar-igreja', component: AdministrarIgrejaComponent },
    { path: '', redirectTo: '/loginas', pathMatch: 'full' }
];
