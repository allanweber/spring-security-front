import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spring-security-web';

  constructor(private authService: AuthService) {

  }

  showLogout(){
    return this.authService.authenticated;
  }

  logout() {
    this.authService.logout();
  }
}
