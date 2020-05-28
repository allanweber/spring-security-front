import { RefreshTokenService } from './../../auth/services/refresh-token.service';
import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  public showNav: boolean;
  public userName: string;

  constructor(private authService: AuthService, private refreshToken: RefreshTokenService) {}

  ngOnInit() {
    this.authService.isAuthenticated.subscribe((e) => (this.showNav = e));

    this.authService.currentUser.subscribe(
      (user) => (this.userName = user.name)
    );
  }

  logout() {
    this.refreshToken.stop();
    this.authService.logout();
  }
}
