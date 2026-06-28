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
    path: 'about-us',
    loadChildren: () =>
      import('./pages/Home-Page/about-us/about-us.module').then(
        (m) => m.AboutUsModule
      ),
  },
   {
    path: 'contact-us',
    loadChildren: () =>
      import('./pages/Home-Page/contact-us/contact-us.module').then(
        (m) => m.ContactUsModule
      ),
  },
   {
    path: 'privacy-policy',
    loadChildren: () =>
      import('./pages/Home-Page/privacy-policy/privacy-policy.module').then(
        (m) => m.PrivacyPolicyModule
      ),
  },
  {
    path: 'delivery-shipping-policy',
    loadChildren: () =>
      import('./pages/Home-Page/delivery-shipping-policy/delivery-shipping-policy.module').then(
        (m) => m.DeliveryShippingPolicyModule
      ),
  },
  {
    path: 'refund-cancellation-policy',
    loadChildren: () =>
      import('./pages/Home-Page/refund-cancellation-policy/refund-cancellation-policy.module').then(
        (m) => m.RefundCancellationPolicyModule
      ),
  },
  {
    path: 'terms-condition',
    loadChildren: () =>
      import('./pages/Home-Page/terms-condition/terms-condition.module').then(
        (m) => m.TermsConditionModule
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
