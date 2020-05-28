import { Observable } from 'rxjs';
import { UserService } from './service/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/model/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public users: Observable<User[]>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.getAll();
  }
}
