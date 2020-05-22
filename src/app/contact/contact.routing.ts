import { ContactDeleteComponent } from './contact-delete/contact-delete.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ContactsListComponent },
  { path: 'add', component: ContactEditComponent },
  { path: 'edit/:id', component: ContactEditComponent },
  { path: 'remove/:id', component: ContactDeleteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule {}
