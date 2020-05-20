import { Router } from '@angular/router';
import { Contact } from './../model/contact.model';
import { ContactsService } from './../services/contacts.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
})
export class ContactEditComponent implements OnInit {
  private numbersValidator = Validators.pattern('^[0-9]*$');

  public contactForm = this.builder.group({
    name: ['Name 121212', [Validators.required, Validators.minLength(5)]],
    age: [
      '36',
      [
        Validators.required,
        Validators.max(120),
        Validators.min(10),
        this.numbersValidator,
      ],
    ],
    email: ['mail@mail.com', [Validators.required, Validators.email]],
    phone: ['234324324324', [Validators.required, this.numbersValidator]],
  });

  constructor(
    private builder: FormBuilder,
    private contactsService: ContactsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  save() {
    if (this.contactForm.invalid) {
      alert('Invalid Contact');
      return;
    }

    const contact: Contact = this.contactForm.value;

    this.contactsService
      .save(contact)
      .subscribe(() => this.router.navigate(['/contacts/list']));
  }

  isInvalid(name) {
    const input = this.contactForm.get(name);
    return input.dirty && input.invalid;
  }
}
