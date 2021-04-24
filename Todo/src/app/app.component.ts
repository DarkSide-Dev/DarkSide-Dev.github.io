import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lista de Tarefas';

  lista: string[] = [];

  tarefas = '';

  adicionar(item: string){
    if(item.trim() != ''){
      this.lista.push(item);
    }
  }

}
