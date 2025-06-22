import { Component, signal } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { Task } from './components/add/add.component'; // ajuste o caminho conforme sua estrutura

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, ToastModule],
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent {
  // Estado compartilhado das tarefas
  tasks = signal<Task[]>([]);

  // Método para adicionar nova tarefa
  onTaskAdded(newTask: Task) {
    this.tasks.set([...this.tasks(), newTask]);
  }

  // Getter para acessar as tarefas (usado pelos componentes filhos)
  getTasks() {
    return this.tasks();
  }
}