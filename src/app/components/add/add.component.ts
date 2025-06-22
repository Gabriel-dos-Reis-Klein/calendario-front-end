import { Component, signal, inject, output, computed, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InputTextarea } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { SliderModule } from 'primeng/slider';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

// Interface para tipagem da tarefa
export interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  priority: TaskPriority;
  estimatedTime: number;
  dueDate?: Date;
  tags: string[];
  createdAt: Date;
  completed: boolean;
  urgent: boolean;
  progress: number;
}

// Enum para os tipos de tarefa
export enum TaskType {
  TRABALHO = 'trabalho',
  ESTUDAR = 'estudar',
  SAUDE = 'saude',
  PESSOAL = 'pessoal',
  FINANCEIRO = 'financeiro',
  FAMILIA = 'familia'
}

// Enum para prioridades
export enum TaskPriority {
  BAIXA = 'baixa',
  MEDIA = 'media',
  ALTA = 'alta',
  CRITICA = 'critica'
}

interface TaskTypeOption {
  label: string;
  value: TaskType;
  icon: string;
  color: string;
  description: string;
}

interface PriorityOption {
  label: string;
  value: TaskPriority;
  icon: string;
  severity: string;
  color: string;
}

@Component({
  selector: 'app-add',
  imports: [
    CommonModule,
    CardModule, 
    FloatLabel, 
    InputText, 
    SelectModule,
    ButtonModule,
    FormsModule,
    InputTextarea,
    CalendarModule,
    ChipsModule,
    SliderModule,
    ToggleButtonModule,
    DividerModule,
    BadgeModule,
    TagModule,
    AvatarModule
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {
  private messageService = inject(MessageService);
  private taskService = inject(TaskService);
  private router = inject(Router);
  
  // Output para comunicar com componente pai
  taskAdded = output<Task>();
  taskPreview = output<Task>();
  
  // Estados do formulário
  title = signal('');
  description = signal('');
  type = signal<TaskType | null>(null);
  priority = signal<TaskPriority>(TaskPriority.MEDIA);
  estimatedTime = signal(60); // em minutos
  dueDate = signal<Date | null>(null);
  tags = signal<string[]>([]);
  urgent = signal(false);
  isLoading = signal(false);
  
  // Estados da UI
  showAdvancedOptions = signal(false);
  formStep = signal(1);
  maxSteps = 3;

  // Computed properties
  isFormValid = computed(() => {
    return this.title().trim().length >= 3 && 
           this.description().trim().length >= 10 && 
           this.type() !== null;
  });

  priorityColor = computed(() => {
    const colors = {
      [TaskPriority.BAIXA]: '#28a745',
      [TaskPriority.MEDIA]: '#ffc107', 
      [TaskPriority.ALTA]: '#fd7e14',
      [TaskPriority.CRITICA]: '#dc3545'
    };
    return colors[this.priority()];
  });

  // Opções de tipos
  typeOptions: TaskTypeOption[] = [
    {
      label: 'Trabalho',
      value: TaskType.TRABALHO,
      icon: 'pi pi-briefcase',
      color: '#3b82f6',
      description: 'Tarefas relacionadas ao trabalho e carreira'
    },
    {
      label: 'Estudar',
      value: TaskType.ESTUDAR,
      icon: 'pi pi-book',
      color: '#8b5cf6',
      description: 'Atividades de aprendizado e desenvolvimento'
    },
    {
      label: 'Saúde',
      value: TaskType.SAUDE,
      icon: 'pi pi-heart',
      color: '#ef4444',
      description: 'Cuidados com saúde física e mental'
    },
    {
      label: 'Pessoal',
      value: TaskType.PESSOAL,
      icon: 'pi pi-user',
      color: '#06b6d4',
      description: 'Objetivos e projetos pessoais'
    },
    {
      label: 'Financeiro',
      value: TaskType.FINANCEIRO,
      icon: 'pi pi-dollar',
      color: '#10b981',
      description: 'Planejamento e controle financeiro'
    },
    {
      label: 'Família',
      value: TaskType.FAMILIA,
      icon: 'pi pi-home',
      color: '#f59e0b',
      description: 'Atividades familiares e domésticas'
    }
  ];

  // Opções de prioridade
  priorityOptions: PriorityOption[] = [
    {
      label: 'Baixa',
      value: TaskPriority.BAIXA,
      icon: 'pi pi-arrow-down',
      severity: 'success',
      color: '#28a745'
    },
    {
      label: 'Média',
      value: TaskPriority.MEDIA,
      icon: 'pi pi-minus',
      severity: 'warning',
      color: '#ffc107'
    },
    {
      label: 'Alta',
      value: TaskPriority.ALTA,
      icon: 'pi pi-arrow-up',
      severity: 'danger',
      color: '#fd7e14'
    },
    {
      label: 'Crítica',
      value: TaskPriority.CRITICA,
      icon: 'pi pi-exclamation-triangle',
      severity: 'danger',
      color: '#dc3545'
    }
  ];

  ngOnInit() {
    // Simula preview em tempo real
    this.setupPreview();
  }

  private setupPreview() {
    // Emite preview quando dados importantes mudam
    const emitPreview = () => {
      if (this.title() && this.type()) {
        const preview = this.createTask();
        this.taskPreview.emit(preview);
      }
    };

    // Observa mudanças nos campos principais
    setInterval(() => {
      if (this.isFormValid()) {
        emitPreview();
      }
    }, 1000);
  }

  /**
   * Avança para próximo step do formulário
   */

  /**
   * Volta para step anterior
   */
  

  /**
   * Alterna exibição de opções avançadas
   */
  toggleAdvancedOptions() {
    this.showAdvancedOptions.set(!this.showAdvancedOptions());
  }

  /**
   * Converte minutos para horas formatadas
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
   * Sugere tags baseadas no tipo selecionado
   */
  getSuggestedTags(): string[] {
    const suggestions = {
      [TaskType.TRABALHO]: ['reunião', 'projeto', 'deadline', 'apresentação', 'email'],
      [TaskType.ESTUDAR]: ['curso', 'prova', 'leitura', 'pesquisa', 'exercício'],
      [TaskType.SAUDE]: ['exercício', 'consulta', 'medicamento', 'dieta', 'exame'],
      [TaskType.PESSOAL]: ['hobby', 'objetivo', 'viagem', 'compras', 'organização'],
      [TaskType.FINANCEIRO]: ['pagamento', 'investimento', 'orçamento', 'conta', 'economia'],
      [TaskType.FAMILIA]: ['evento', 'tarefa doméstica', 'criança', 'planejamento', 'festa']
    };
    
    return this.type() ? suggestions[this.type()!] || [] : [];
  }

  /**
   * Adiciona tag sugerida
   */
  addSuggestedTag(tag: string) {
    const currentTags = this.tags();
    if (!currentTags.includes(tag)) {
      this.tags.set([...currentTags, tag]);
    }
  }


  /**
   * Cria uma nova tarefa
   */
  private createTask(): Task {
  return {
    id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: this.title().trim(),
    description: this.description().trim(),
    type: this.type()!,
    priority: this.priority(),
    estimatedTime: this.estimatedTime(),
    dueDate: this.dueDate() ?? undefined,
    tags: this.tags(),
    createdAt: new Date(),
    completed: false,
    urgent: this.urgent(),
    progress: 0
  };
}


  /**
   * Limpa o formulário
   */
  private resetForm(): void {
    this.title.set('');
    this.description.set('');
    this.type.set(null);
    this.priority.set(TaskPriority.MEDIA);
    this.estimatedTime.set(60);
    this.dueDate.set(null);
    this.tags.set([]);
    this.urgent.set(false);
    this.formStep.set(1);
    this.showAdvancedOptions.set(false);
  }

  /**
   * Exibe mensagem de erro
   */
  private showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Ops! Algo deu errado',
      detail: message,
      life: 4000
    });
  }

  /**
   * Exibe mensagem de sucesso
   */
  private showSuccess(): void {
    this.messageService.add({
      severity: 'success',
      summary: '🎉 Tarefa criada!',
      detail: 'Sua nova tarefa foi adicionada com sucesso',
      life: 3000
    });
  }

  /**
   * Salva a tarefa
   */
  async save(): Promise<void> {
    this.isLoading.set(true);

    try {
      // Simula chamada de API
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const task = this.createTask();
      
      console.log('🚀 Nova tarefa criada:', task);
      
      // Adiciona no service em vez de emitir evento
      this.taskService.addTask(task);
      
      this.taskAdded.emit(task); // mantém para compatibilidade
      this.resetForm();
      this.showSuccess();
      
      // Navega para a lista após salvar
      this.router.navigate(['/list']);
      
    } catch (error) {
      console.error('❌ Erro ao salvar tarefa:', error);
      this.showError('Não foi possível salvar sua tarefa. Tente novamente!');
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Getters para UI
   */
  get buttonLabel(): string {
    return this.isLoading() ? 'Criando tarefa...' : '✨ Criar Tarefa';
  }

  get buttonIcon(): string {
    return this.isLoading() ? 'pi pi-spin pi-spinner' : 'pi pi-plus-circle';
  }

  get stepTitle(): string {
    const titles = {
      1: 'Informações Básicas',
      2: 'Categoria e Prioridade', 
      3: 'Detalhes Avançados'
    };
    return titles[this.formStep() as keyof typeof titles];
  }

  get today(): Date {
  return new Date();
}

selectedTypeLabel = computed(() => {
  const selected = this.typeOptions.find(t => t.value === this.type());
  return selected ? selected.label : undefined;
});

selectedTypeColor = computed(() => {
  const selected = this.typeOptions.find(t => t.value === this.type());
  return selected ? selected.color : undefined;
});

}