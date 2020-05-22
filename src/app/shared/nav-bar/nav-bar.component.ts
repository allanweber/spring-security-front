import { AuthService } from './../../auth/services/auth.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  show(){
    return this.authService.authenticated;
  }

  logout(){
    this.authService.logout();
  }

  getUser() {
    return this.authService.user?.firstName || this.authService.user?.userName;
  }
}
