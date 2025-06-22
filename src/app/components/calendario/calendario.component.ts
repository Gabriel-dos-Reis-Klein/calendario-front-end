import { Component, OnInit, signal } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendario',
  imports: [CommonModule, ButtonModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})

export class CalendarioComponent implements OnInit{
  
  constructor(private router: Router) {}
  
  dataAtual: Date = new Date();
  diasCalendario: Date[] = [];

  ngOnInit() {
    this.construirCalendario();
  }

  // Navegar para ADD passando a data
  irParaAdd(data: Date) {
    const dataFormatada = data.toISOString().split('T')[0]; // formato YYYY-MM-DD
    this.router.navigate(['/add'], { 
      queryParams: { data: dataFormatada } 
    });
  }

  // Navegar para LIST passando a data
  irParaList(data: Date) {
    const dataFormatada = data.toISOString().split('T')[0]; // formato YYYY-MM-DD
    this.router.navigate(['/list'], { 
      queryParams: { data: dataFormatada } 
    });
  }

  construirCalendario() {
    const ano = this.dataAtual.getFullYear();
    const mes = this.dataAtual.getMonth();

    const primeiroDiaDaSemana = 0; // domingo
    const ultimoDiaDaSemana = 6; // sábado

    const dataInicial = new Date(ano, mes, 1);
    while (dataInicial.getDay() !== primeiroDiaDaSemana) {
      dataInicial.setDate(dataInicial.getDate() - 1);
    }

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