import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  login() {
    if (this.loginForm.invalid) {
      alert('Invalid Credentials');
      return;
    }

    const credentials: any = {
      user: this.loginForm.get('userName').value,
      password: this.loginForm.get('password').value,
    };

    this.authService.authenticate(credentials);
  }

  get google() {
    return `${environment.backend}/oauth2/authorization/google`;
  }

  get facebook() {
    return `${environment.backend}/oauth2/authorization/facebook`;
  }

  get github() {
    return `${environment.backend}/oauth2/authorization/github`;
  }

  isInvalid(name) {
    const input = this.loginForm.get(name);
    return input.dirty && input.invalid;
  }
}
