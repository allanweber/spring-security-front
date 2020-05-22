import { Router, ActivatedRoute } from '@angular/router';
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
    id: [''],
    name: ['', [Validators.required, Validators.minLength(5)]],
    age: [
      '',
      [
        Validators.required,
        Validators.max(120),
        Validators.min(10),
        this.numbersValidator,
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, this.numbersValidator]],
  });

  constructor(
    private builder: FormBuilder,
    private contactsService: ContactsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.activatedRoute.routeConfig.path === 'add') {
      return;
    }

    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.contactsService.get(params.id).subscribe(
          (response) => this.load(response),
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

  load(contact: Contact) {
    const formData = {
      id: contact.id,
      name: contact.name,
      age: contact.age,
      email: contact.email,
      phone: contact.phone,
    };

    this.contactForm.patchValue(formData);
  }

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
