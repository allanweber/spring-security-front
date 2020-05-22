import { isEmpty } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ContactsService } from './../services/contacts.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from '../model/contact.model';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  public contacts: Observable<Contact[]>;

  constructor(public contactsService: ContactsService) {
  }

  ngOnInit(): void {
    this.contacts = this.contactsService.getAll();
  }

}
