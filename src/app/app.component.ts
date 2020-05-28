import { AuthService } from './auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Contacts';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.populate();
  }
}
