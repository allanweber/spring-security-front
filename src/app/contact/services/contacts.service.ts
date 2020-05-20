import { Observable } from 'rxjs';
import { Contact } from './../model/contact.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {

  private backEnd = environment.backend;
  private contactsUrl = `${environment.backend}/contacts`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl);
  }

  save(contact: Contact) {
    return this.http.post<Contact>(this.contactsUrl, contact);
  }
}
