import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/Home-Page/Home-Page.module').then(
        (m) => m.HomePageModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/pages/Auth/Auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('../app/pages/main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/Admin/Admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'superadmin',
    loadChildren: () =>
      import('./pages/Superadmin/Superadmin.module').then(
        (m) => m.SuperadminModule
      ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '**', redirectTo: 'auth/login' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
