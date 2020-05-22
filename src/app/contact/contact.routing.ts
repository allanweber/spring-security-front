import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from './../auth/guards/admin.guard';
import { ContactDeleteComponent } from './contact-delete/contact-delete.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ContactsListComponent },
  { path: 'add', component: ContactEditComponent },
  { path: 'edit/:id', component: ContactEditComponent, canActivate: [AdminGuardService] },
  { path: 'remove/:id', component: ContactDeleteComponent, canActivate: [AdminGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule {}
