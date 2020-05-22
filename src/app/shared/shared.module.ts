import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HasRoleDirective } from './directives/has-role.directive';
import { NgModule } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [NavBarComponent, HasRoleDirective],
  exports: [NavBarComponent, HasRoleDirective],
})
export class SharedModule {}
