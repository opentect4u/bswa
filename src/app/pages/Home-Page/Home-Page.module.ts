import {
  APP_INITIALIZER
} from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Home-Page.component';
import { header_HomeModule } from './header_Home/header_Home.module';
import { FooterModule } from './footer/footer.module';
import { initializeApp } from 'src/app/service/app-initializer';
import { ScriptLoaderService } from 'src/app/service/Script-Loader.service';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((home) => home.HomeModule),
      },
      {
        path: 'memb_form_home',
        loadChildren: () =>
          import('./Memb-home/Memb-home.module').then((home) => home.MembHomeModule),
      },
      {
        path: 'gen_memb_form_register/:flag',
        loadChildren: () =>
          import('./general_membership_form/general_membership_form.module').then((home) => home.General_membership_formModule),
      },
      {
        path: 'life_memb_form_register/:flag',
        loadChildren: () =>
          import('./life_membership_form/life_membership_form.module').then((home) => home.Life_membership_formModule),
      },
      {
        path: 'associate_memb_form_register/:flag',
        loadChildren: () =>
          import('./associate_membership_form/associate_membership_form.module').then((home) => home.Associate_membership_formModule),
      },
      {
        path: 'insurance_form_home',
        loadChildren: () =>
          import('./Insurance-home/Insurance-home.module').then((home) => home.InsuranceHomeModule),
      },
      {
        path: 'super_topup_register',
        loadChildren: () =>
          import('./super_top_up_policy_register/super_top_up_policy_register.module').then((home) => home.Super_top_up_policy_registerModule),
      },
      {
        path: 'print_general_form/:form_no',
        loadChildren: () =>
          import('./print_general_form/print_general_form.module').then((home) => home.Print_general_formModule),
      },
      {
        path: 'life_form_print/:form_no',
        loadChildren: () =>
          import('./life_form_print/life_form_print.module').then((home) => home.Life_form_printModule),
      },
      {
        path: 'associate_form_print/:form_no',
        loadChildren: () =>
          import('./associate_form_print/associate_form_print.module').then((home) => home.Associate_form_printModule),
      },
      {
        path: 'login_details',
        loadChildren: () =>
          import('./login_details/login_details.module').then((home) => home.Login_detailsModule),
      },
      {
        path: 'print_stp_form/:form_no/:policy_holder_type',
        loadChildren: () =>
          import('./print_stp_form/print_stp_form.module').then((home) => home.Print_stp_formModule),
      },
      {
        path: 'children_policy',
        loadChildren: () =>
          import('./children_policy/children_policy.module').then((home) => home.Children_policyModule),
      },
      {
        path: 'group_policy',
        loadChildren: () =>
          import('./group_policy/group_policy.module').then((home) => home.Group_policyModule),
      },
      {
        path: 'print_group_policy/:form_no/:policy_holder_type',
        loadChildren: () =>
          import('./print_group_policy/print_group_policy.module').then((home) => home.Print_group_policyModule),
      },
      {
        path: 'money_receipt_member/:member_id/:trn_id',
        loadChildren: () =>
          import('./money_receipt_member/money_receipt_member.module').then(
            (m) => m.Money_receipt_memberModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    header_HomeModule,
    FooterModule,
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    deps: [ScriptLoaderService],
    multi: true
  }],
  declarations: [HomePageComponent],
})
export class HomePageModule {}
