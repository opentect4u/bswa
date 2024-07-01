import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ScrollerModule } from 'primeng/scroller';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../main/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'group_policy',
        loadChildren: () =>
          import('../main/group_policy/group_policy.module').then(
            (m) => m.Group_policyModule
          ),
      },
      {
        path: 'child_group_policy',
        loadChildren: () =>
          import('../main/child_group_policy/child_group_policy.module').then(
            (m) => m.Child_group_policyModule
          ),
      },
      {
        path: 'super_topup_policy',
        loadChildren: () =>
          import('../main/super_topup_policy/super_topup_policy.module').then(
            (m) => m.Super_topup_policyModule
          ),
      },
       {
        path: 'print_stp_form/:form_no',
        loadChildren: () =>
          import('../main/print_stp_form/print_stp_form.module').then(
            (m) => m.Print_stp_formModule
          ),
      },
      {
        path: 'print_group_policy_form/:form_no',
        loadChildren: () =>
          import('../main/print_group_policy_form/print_group_policy_form.module').then(
            (m) => m.Print_group_policy_formModule
          ),
      },
      {
        path: 'change_password_member',
        loadChildren: () =>
          import('../main/change_password_member/change_password_member.module').then(
            (m) => m.Change_password_memberModule
          ),
      },
     
      // {
      //   path: 'general_form',
      //   loadChildren: () =>
      //     import('../main/general_form/general_form.module').then(
      //       (m) => m.General_formModule
      //     ),
      // },
      // {
      //   path: 'add_general_form',
      //   loadChildren: () =>
      //     import('../main/add_general_form/add_general_form.module').then(
      //       (m) => m.Add_general_formModule
      //     ),
      // },
      // {
      //   path: 'unit',
      //   loadChildren: () =>
      //     import('../main/unit/unit.module').then(
      //       (m) => m.UnitModule
      //     ),
      // },
      // {
      //   path: 'add_unit',
      //   loadChildren: () =>
      //     import('../main/unit_add/unit_add.module').then(
      //       (m) => m.Unit_addModule
      //     ),
      // },
      // {
      //   path: 'edit_unit',
      //   loadChildren: () =>
      //     import('../main/unit_edit/unit_edit.module').then(
      //       (m) => m.Unit_editModule
      //     ),
      // },
      // {
      //   path: 'member_fee_type',
      //   loadChildren: () =>
      //     import('../main/mem_fee_type/mem_fee_type.module').then(
      //       (m) => m.Mem_fee_typeModule
      //     ),
      // },
      // {
      //   path: 'add_member_fee_type',
      //   loadChildren: () =>
      //     import('../main/add_mem_fee_type/add_mem_fee_type.module').then(
      //       (m) => m.Add_mem_fee_typeModule
      //     ),
      // },
      // {
      //   path: 'edit_member_fee_type',
      //   loadChildren: () =>
      //     import('../main/edit_mem_fee_type/edit_mem_fee_type.module').then(
      //       (m) => m.Edit_mem_fee_typeModule
      //     ),
      // },
      // {
      //   path: 'member_form',
      //   loadChildren: () =>
      //     import('../main/member_form/member_form.module').then(
      //       (m) => m.Member_formModule
      //     ),
      // },
      // {
      //   path: 'spouse_form',
      //   loadChildren: () =>
      //     import('../main/spouse_info/spouse_info.module').then(
      //       (m) => m.Spouse_infoModule
      //     ),
      // },
      // {
      //   path: 'gen_dep_form',
      //   loadChildren: () =>
      //     import('../main/gen_dep_form/gen_dep_form.module').then(
      //       (m) => m.Gen_dep_formModule
      //     ),
      // },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    ToolbarModule,
    SidebarModule,
    ButtonModule,
    RippleModule,
    MenuModule,
    PanelMenuModule,
    ScrollerModule,
    DividerModule,
    CardModule,
    RouterModule.forChild(routes),
  ],
  declarations: [MainComponent, SidebarComponent, HeaderComponent],
})
export class MainModule {}
