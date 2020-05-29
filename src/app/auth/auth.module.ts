import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SocialComponent } from './social/social.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, SocialComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AuthRoutingModule],
})
export class AuthModule {}
