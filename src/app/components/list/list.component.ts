import { Component, inject, computed } from '@angular/core';
import { TaskService } from '../../services/task.service'; // ajuste o caminho
import { Task } from '../add/add.component'; // ajuste o caminho
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  private taskService = inject(TaskService);

  // Obtém as tarefas do service de forma reativa
  tasks = this.taskService.tasks;

  // Computed properties para estatísticas
  taskCount = computed(() => this.tasks().length);
  completedTasks = computed(() => this.tasks().filter(task => task.completed).length);
  pendingTasks = computed(() => this.tasks().filter(task => !task.completed).length);

  /**
   * Alterna o status de conclusão de uma tarefa
   */
  toggleTaskCompletion(task: Task): void {
    this.taskService.toggleTaskCompletion(task.id);
  }

   /**
   * Formata o tempo de minutos para horas/minutos
   */
  formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}min`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${mins}min`;
    }
  }

  /**
   * Formata a data para exibição
   */
  formatDate(date: Date): string {
    if (!date) return '';
    
    const today = new Date();
    const taskDate = new Date(date);
    
    // Calcula diferença em dias
    const diffTime = taskDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Hoje';
    } else if (diffDays === 1) {
      return 'Amanhã';
    } else if (diffDays === -1) {
      return 'Ontem';
    } else if (diffDays > 1) {
      return `Em ${diffDays} dias`;
    } else {
      return `${Math.abs(diffDays)} dias atrás`;
    }
  }
}