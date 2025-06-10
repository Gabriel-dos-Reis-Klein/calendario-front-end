import { Routes } from "@angular/router";
import { CalendarioComponent } from "./components/calendario/calendario.component";
// import { ListComponent } from "./components/list/list.component";
import { AddComponent } from "./components/add/add.component";

export const routes: Routes = [
    {path: '', redirectTo: 'calendario', pathMatch: "full"},
    {path: 'calendario', component: CalendarioComponent},
    // {path: 'list', component: ListComponent},
    {path: 'add', component: AddComponent}
]