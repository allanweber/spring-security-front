import { TwoFactorGuardService } from './guards/two-factor.guard';
import { TwoFactorComponent } from './two-factor/two-factor.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: 'signIn', pathMatch: 'full'},
  { path: 'signIn', component: LoginComponent},
  { path: 'signUp', component: RegisterComponent},
  { path: 'two-factor', component: TwoFactorComponent, canActivate: [TwoFactorGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
