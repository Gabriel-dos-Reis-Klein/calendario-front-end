import { Component, signal, inject } from '@angular/core';
import {CardModule} from 'primeng/card';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {SelectModule} from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add',
  imports: [
    CardModule, 
    FloatLabel, 
    InputText, 
    SelectModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  messageService = inject(MessageService)
 types = signal(['Trabalho', 'Estudar', 'Saude'])

 description = signal('')
 type = signal<any>(null)

 disableButton(){
  return !this.description() || !this.type()
 }

  save(){
    const task = {
      id: new Date().getTime(),
      description: this.description(),
      type: this.type(),
      createdAt: new Date()
    }

    console.log(task)

    this.description.set('')
    this.type.set(null)

    this.messageService.add({
      severity: 'success',
      summary: 'Salvo',
      detail: 'Salvo com sucesso'
    })
  }
}
