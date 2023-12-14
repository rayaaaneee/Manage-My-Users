import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { UpdateComponent } from './update/update.component';
import { AddComponent } from './add/add.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users' },
  { path: 'users', component: ListComponent },
  { path: 'user/:id', component: DetailsComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: 'add', component: AddComponent },
  { path: '**', redirectTo: 'users' },
];
