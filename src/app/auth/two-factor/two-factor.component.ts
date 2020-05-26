import { AuthService } from './../services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor.component.html',
  styleUrls: ['./two-factor.component.css'],
})
export class TwoFactorComponent implements OnInit {
  public loginForm = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
  });

  public qrCode: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  login() {
    if (this.loginForm.invalid) {
      alert('Invalid Code');
      return;
    }

    this.authService.loginTwoFactor(this.loginForm.get('code').value);
  }

  newQrCode() {
    this.authService.setUpTwoFactor().subscribe((qrCode) => {
      console.log(qrCode);
      this.qrCode = qrCode.url;
    });
  }

  isInvalid(name) {
    const input = this.loginForm.get(name);
    return input.dirty && input.invalid;
  }
}
