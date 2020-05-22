import { Contact } from './../model/contact.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactsService } from './../services/contacts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-delete',
  templateUrl: './contact-delete.component.html',
  styleUrls: ['./contact-delete.component.css'],
})
export class ContactDeleteComponent implements OnInit {
  public contact: Contact = new Contact();

  constructor(
    private contactsService: ContactsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.contactsService.get(params.id).subscribe(
          (response) => (this.contact = response),
          () => {
            alert('Invalid Contact');
            this.router.navigate(['/contacts/list']);
          }
        );
      } else {
        alert('Invalid Contact');
        this.router.navigate(['/contacts/list']);
      }
    });
  }

  delete(){
    this.contactsService
      .delete(this.contact.id)
      .subscribe(() => this.router.navigate(['/contacts/list']));
  }

  generateArray(obj) {
    return Object.keys(obj)
      .filter((key) => key !== 'id')
      .map((key) => {
        return { key, value: obj[key] };
      });
  }
}
