import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { LoginComponent } from './components/login/login.component';
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { AccesoNoAutorizadoComponent } from './components/acceso-no-autorizado/acceso-no-autorizado.component';
import { authorizedAccessGuard } from './guards/authorized-access.guard';

export const routes: Routes = [
        { path: '', redirectTo: '/home', pathMatch: "full" },
        { path: 'home', component: HomeComponent },
        { path: 'quien-soy', component: QuienSoyComponent },
        { path: 'login', component: LoginComponent },
        { path: 'registro', component: RegistroComponent },
        { path: 'juegos', loadChildren: () => import('./modules/juegos/juegos.module').then(m => m.JuegosModule), canActivate: [ authorizedAccessGuard ] },
        { path: 'chat', loadChildren: () => import('./modules/chat/chat.module').then(m => m.ChatModule), canActivate: [ authorizedAccessGuard ] },
        { path: 'puntuaciones', loadChildren: () => import('./modules/puntuaciones/puntuaciones.module').then(m => m.PuntuacionesModule), canActivate: [ authorizedAccessGuard ] },
        { path: 'encuesta', component: EncuestaComponent, canActivate: [ authorizedAccessGuard ] },
        { path: 'acceso-no-autorizado', component: AccesoNoAutorizadoComponent,  },
        { path: '**', component: PaginaNoEncontradaComponent },
];