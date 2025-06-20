import { Component, signal } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-header',
  imports: [ToolbarModule, ButtonModule, RouterLink, AccordionModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menus = signal<any[]>([
    {
      label: 'Calendário',
      icon: 'pi pi-chart-bar',
      selected: true,
      route: 'calendario'
    },
    {
      label: 'List',
      icon: 'pi pi-list',
      selected: false,
      route: 'list'
    },
    {
      label: 'Adicionar',
      icon: 'pi pi-plus-circle',
      selected: false,
      route: 'add'
    },
  ]);

  selectMenu(index: number) {
    this.menus.update(menus => {
      menus.forEach((m, i) => (m.selected = index === i));
      return menus
    });
  };

}
