import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './Auth.component';
import { RouterModule, Routes } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule),
      },
       {
        path: 'choose_section',
        loadChildren: () =>
          import('./choose_section/choose_section.module').then((m) => m.Choose_sectionModule),
      },
      {
        path: 'member_login',
        loadChildren: () =>
          import('./member_login/member_login.module').then((m) => m.Member_loginModule),
      },
       {
        path: 'register',
        loadChildren: () =>
          import('./register/register.module').then((m) => m.RegisterModule),
      },
      {
        path: 'verify_otp',
        loadChildren: () =>
          import('./verify_otp/verify_otp.module').then((m) => m.Verify_otpModule),
      },
      {
        path: 'set_pin',
        loadChildren: () =>
          import('./set_pin/set_pin.module').then((m) => m.Set_pinModule),
      },
      {
        path: 'superadmin_login',
        loadChildren: () =>
          import('./superadmin_login/superadmin_login.module').then((m) => m.Superadmin_loginModule),
      },
      {
        path: 'payment_preview_page',
        loadChildren: () =>
          import('./payment_preview_page/payment_preview_page.module').then((m) => m.Payment_preview_pageModule),
      },
       {
        path: 'payment_expired_page',
        loadChildren: () =>
          import('./payment_expired/payment_expired.module').then((m) => m.Payment_expiredModule),
      },
       {
        path: 'stp_member_login',
        loadChildren: () =>
          import('./stp_member_login/stp_member_login.module').then((m) => m.Stp_member_loginModule),
      },
    ],
  }
];

@NgModule({
  imports: [CommonModule, InputTextModule, RouterModule.forChild(routes)],
  declarations: [AuthComponent],
})
export class AuthModule {}
