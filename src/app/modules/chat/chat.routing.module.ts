import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentanaChatComponent } from './ventana-chat/ventana-chat.component';

const routes: Routes = [
  { path: '', component: VentanaChatComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ChatRoutingModule { }