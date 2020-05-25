import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RegistrationService } from './../services/registration.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerForm = this.builder.group(
    {
      // firstName: ['admin', [Validators.required, Validators.minLength(5)]],
      // lastName: ['admin', [Validators.required, Validators.minLength(5)]],
      // userName: ['admin', [Validators.required, Validators.minLength(5)]],
      // email: ['admin@mail.com', [Validators.required, Validators.email]],
      // password: ['admin', [Validators.required]],
      // confirmPassword: ['admin', [Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      userName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validator: this.mustMatch('password', 'confirmPassword'),
    }
  );

  public messages: string[] = [];

  constructor(
    private registrationService: RegistrationService,
    private builder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {}

  register() {
    this.messages = [];
    if (this.registerForm.invalid) {
      alert('Invalid Form');
    }

    this.registrationService.register(this.registerForm.value).subscribe(
      () => {
        this.router.navigate(['/auth/signIn']);
      },
      (err) => {
        this.parseErrors(err.error);
      }
    );
  }

  isInvalid(name) {
    const input = this.registerForm.get(name);
    return input.dirty && input.invalid;
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  parseErrors(errors: any) {
    errors.detail?.forEach((error) => {
      const field = this.registerForm.get(error.fieldName);
      if (field) {
        field.markAsDirty();
        field.setErrors({ required: true });
        this.messages.push(error.message);
      }
    });
  }
}
