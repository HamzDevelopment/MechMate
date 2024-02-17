import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: 'mechanic-list',
    loadChildren: () => import('./pages/mechanic-list/mechanic-list.module').then(m => m.MechanicListPageModule)
  },
  {
    path: 'mechanic-profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/mechanic-profile/mechanic-profile.module').then(m => m.MechanicProfilePageModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminPageModule)
  },
  {
    path: 'diagnostic',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/diagnostic/diagnostic.module').then(m => m.DiagnosticPageModule)
  },
  {
    path: 'vehicles',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/vehicles/vehicles.module').then(m => m.VehiclesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
