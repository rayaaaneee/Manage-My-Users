import { Routes } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { UpdateComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';

export const routes: Routes = [
  { path: 'users', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'user/:id', component: DetailsComponent, canActivate: [AuthGuard] },
  { path: 'update/:id', component: UpdateComponent, canActivate: [AuthGuard] },
  { path: 'delete/:id', component: DeleteComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'users'},
  { path: '**', redirectTo: 'users' },
];
