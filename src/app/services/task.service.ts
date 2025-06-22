import { Injectable, signal } from '@angular/core';
import { Task } from '../components/add/add.component';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // Signal para armazenar as tarefas
  private tasksSignal = signal<Task[]>([]);

  // Getter para acessar as tarefas (readonly)
  get tasks() {
    return this.tasksSignal.asReadonly();
  }

  // Método para adicionar nova tarefa
  addTask(task: Task): void {
    this.tasksSignal.set([...this.tasksSignal(), task]);
  }

  // Método para alternar o status de conclusão de uma tarefa
  toggleTaskCompletion(taskId: string): void {
    this.tasksSignal.update(currentTasks => 
      currentTasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  // Método para obter todas as tarefas
  getAllTasks(): Task[] {
    return this.tasksSignal();
  }

  // Método para contar tarefas
  getTaskCount(): number {
    return this.tasksSignal().length;
  }

  // Método para contar tarefas concluídas
  getCompletedTasksCount(): number {
    return this.tasksSignal().filter(task => task.completed).length;
  }

  // Método para contar tarefas pendentes
  getPendingTasksCount(): number {
    return this.tasksSignal().filter(task => !task.completed).length;
  }

  // Método para obter apenas tarefas concluídas
  getCompletedTasks(): Task[] {
    return this.tasksSignal().filter(task => task.completed);
  }

  // Método para obter apenas tarefas pendentes
  getPendingTasks(): Task[] {
    return this.tasksSignal().filter(task => !task.completed);
  }

  // Método para remover uma tarefa pelo ID
  removeTask(taskId: string): void {
    this.tasksSignal.update(currentTasks => 
      currentTasks.filter(task => task.id !== taskId)
    );
  }

  // Método para atualizar uma tarefa
  updateTask(updatedTask: Task): void {
    this.tasksSignal.update(currentTasks => 
      currentTasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  }

  // Método para limpar todas as tarefas (útil para testes)
  clearTasks(): void {
    this.tasksSignal.set([]);
  }

  // Método para marcar todas as tarefas como concluídas
  markAllAsCompleted(): void {
    this.tasksSignal.update(currentTasks => 
      currentTasks.map(task => ({ ...task, completed: true }))
    );
  }

  // Método para marcar todas as tarefas como pendentes
  markAllAsPending(): void {
    this.tasksSignal.update(currentTasks => 
      currentTasks.map(task => ({ ...task, completed: false }))
    );
  }
}