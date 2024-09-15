import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { LoginComponent } from './componentes/login/login.component';
import { PaginaNoEncontradaComponent } from './componentes/pagina-no-encontrada/pagina-no-encontrada.component';
import { RegistroComponent } from './componentes/registro/registro.component';

export const routes: Routes = [
        { path: '', redirectTo: '/home', pathMatch: "full" },
        { path: 'home', component: HomeComponent },
        { path: 'quien-soy', component: QuienSoyComponent },
        { path: 'login', component: LoginComponent },
        { path: 'registro', component: RegistroComponent },
        { path: 'juegos', loadChildren: () => import('./modulos/juegos/juegos.module').then(m => m.JuegosModule) },
        { path: '**', component: PaginaNoEncontradaComponent },     
];