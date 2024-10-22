import { Routes } from '@angular/router';
import { LoginasComponent } from './loginas/loginas.component';

export const routes: Routes = [
    { path: 'loginas', component: LoginasComponent },
    { path: '', redirectTo: '/loginas', pathMatch: 'full' }
];
