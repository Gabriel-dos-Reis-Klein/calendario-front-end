import { Component, OnInit, signal } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-calendario',
  imports: [CommonModule, ButtonModule, RouterLink],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})

 
export class CalendarioComponent implements OnInit{
  menus = signal<any[]>([
    {
      label: '',
      icon: 'pi pi-plus-circle',
      selected: false,
      route: 'add'
    },
    {
      label: '',
      icon: 'pi pi-list',
      selected: false,
      route: 'list'
    },
  ]);

  selectMenu(index: number) {
    this.menus.update(menus => {
      menus.forEach((m, i) => (m.selected = index === i));
      return menus
    });
  };
  
  dataAtual: Date = new Date();
  diasCalendario: Date[] = [];

  ngOnInit() {
    this.construirCalendario();
  }

  construirCalendario() {
    const ano = this.dataAtual.getFullYear();
    const mes = this.dataAtual.getMonth();

    const primeiroDiaDaSemana = 0; // domingo
    const ultimoDiaDaSemana = 6; // sábado

    // Vai subtraindo -1 até chegarmos no primeiro dia da semana
    const dataInicial = new Date(ano, mes, 1);
    while (dataInicial.getDay() !== primeiroDiaDaSemana) {
      dataInicial.setDate(dataInicial.getDate() - 1);
    }

    // Vai somando +1 até chegarmos no último dia da semana
    const dataFinal = new Date(ano, mes + 1, 0);
    while (dataFinal.getDay() !== ultimoDiaDaSemana) {
      dataFinal.setDate(dataFinal.getDate() + 1);
    }

    this.diasCalendario = [];
    for (
      let data = new Date(dataInicial.getTime());
      data <= dataFinal;
      data.setDate(data.getDate() + 1)
    ) {
      this.diasCalendario.push(new Date(data.getTime()));
    }
  }

  alterarMes(offsetMes: number) {
      this.dataAtual.setMonth(this.dataAtual.getMonth() + offsetMes);
      this.dataAtual = new Date(this.dataAtual.getTime());
      this.construirCalendario();
  }
}
