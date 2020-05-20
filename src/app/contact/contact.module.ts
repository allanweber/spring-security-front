import { ReactiveFormsModule } from '@angular/forms';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRoutingModule } from './contact.routing';
import { ContactEditComponent } from './contact-edit/contact-edit.component';



@NgModule({
  declarations: [ContactsListComponent, ContactEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContactRoutingModule
  ]
})
export class ContactModule { }
