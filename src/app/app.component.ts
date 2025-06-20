import { Component } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { RouterOutlet } from '@angular/router';
import {ToastModule} from 'primeng/toast'


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, ToastModule],
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent {
}
