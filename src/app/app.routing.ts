import { AdminGuardService } from './auth/guards/admin.guard';
import { AuthGuardService } from './auth/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '', redirectTo: '/contacts/list', pathMatch: 'full' },
  {
    path: 'contacts',
    loadChildren: () => import('./contact/contact.module').then((m) => m.ContactModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AdminGuardService],
  },

  // {path: '**', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
