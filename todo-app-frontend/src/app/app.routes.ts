import { Routes } from '@angular/router';
import {TaskListComponent} from "./components/task-list/task-list.component";
import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: TaskListComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];
