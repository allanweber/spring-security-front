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
      username: this.loginForm.get('userName').value,
      password: this.loginForm.get('password').value,
    };

    this.authService.login(credentials);
  }

  isInvalid(name) {
    const input = this.loginForm.get(name);
    return input.dirty && input.invalid;
  }
}
