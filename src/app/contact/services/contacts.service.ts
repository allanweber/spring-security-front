import { Observable } from 'rxjs';
import { Contact } from './../model/contact.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private contactsUrl = `${environment.backend}/contacts`;

  private managementUrl = `${environment.backend}/admin/contacts`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl);
  }

  save(contact: Contact) {
    if (contact.id) {
      return this.edit(contact);
    } else {
      return this.add(contact);
    }
  }

  get(id: string) {
    return this.http.get<Contact>(`${this.contactsUrl}/${id}`);
  }

  add(contact: Contact) {
    return this.http.post<Contact>(this.contactsUrl, contact);
  }

  edit(contact: Contact) {
    return this.http.put<Contact>(
      `${this.managementUrl}/${contact.id}`,
      contact
    );
  }

  delete(id: string) {
    return this.http.delete(`${this.managementUrl}/${id}`);
  }
}
