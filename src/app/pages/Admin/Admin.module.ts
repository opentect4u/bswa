import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './Admin.component';
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
import { ProgressBarModule } from 'primeng/progressbar';

import { AvatarModule } from 'primeng/avatar';

// import { LoaderComponent } from '../Common/loader/loader.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../Admin/admin_dashboard/admin_dashboard.module').then(
            (m) => m.Admin_dashboardModule
          ),
      },
      // {
      //   path: 'fee_type',
      //   loadChildren: () =>
      //     import('../Admin/admin_fee_type/admin_fee_type.module').then(
      //       (m) => m.Admin_fee_typeModule
      //     ),
      // },
      // {
      //   path: 'add_fee_type/:flag',
      //   loadChildren: () =>
      //     import('../Admin/add_fee_type/add_fee_type.module').then(
      //       (m) => m.Add_fee_typeModule
      //     ),
      // },
      {
        path: 'member_form',
        loadChildren: () =>
          import('../Admin/member_form/member_form.module').then(
            (m) => m.Member_formModule
          ),
      },
      {
        path: 'spouse_form',
        loadChildren: () =>
          import('../Admin/spouse_info/spouse_info.module').then(
            (m) => m.Spouse_infoModule
          ),
      },
      {
        path: 'gen_dep_form',
        loadChildren: () =>
          import('../Admin/gen_dep_form/gen_dep_form.module').then(
            (m) => m.Gen_dep_formModule
          ),
      },
      {
        path: 'gen_img_upload',
        loadChildren: () =>
          import('../Admin/gen_img_upload/gen_img_upload.module').then(
            (m) => m.Gen_img_uploadModule
          ),
      },
      {
        path: 'gen_fee_form',
        loadChildren: () =>
          import('../Admin/gen_fee_form/gen_fee_form.module').then(
            (m) => m.Gen_fee_formModule
          ),
      },
      {
        path: 'life_form',
        loadChildren: () =>
          import('../Admin/life_mem_form/life_mem_form.module').then(
            (m) => m.Life_mem_formModule
          ),
      },
      {
        path: 'life_fee_form',
        loadChildren: () =>
          import('../Admin/life_fee_form/life_fee_form.module').then(
            (m) => m.Life_fee_formModule
          ),
      },
      {
        path: 'asso_mem_form',
        loadChildren: () =>
          import('../Admin/asso_mem_form/asso_mem_form.module').then(
            (m) => m.Asso_mem_formModule
          ),
      },
      {
        path: 'asso_intro_form',
        loadChildren: () =>
          import('../Admin/asso_intro_mem/asso_intro_mem.module').then(
            (m) => m.Asso_intro_memModule
          ),
      },
      {
        path: 'asso_dep_form',
        loadChildren: () =>
          import('../Admin/asso_dep_form/asso_dep_form.module').then(
            (m) => m.Asso_dep_formModule
          ),
      },
      {
        path: 'asso_img_upload',
        loadChildren: () =>
          import('../Admin/asso_img_upload/asso_img_upload.module').then(
            (m) => m.Asso_img_uploadModule
          ),
      },
      {
        path: 'asso_fee_form',
        loadChildren: () =>
          import('../Admin/asso_fee_form/asso_fee_form.module').then(
            (m) => m.Asso_fee_formModule
          ),
      },
      {
        path: 'admin_preview_form/:form_no/:gender/:member',
        loadChildren: () =>
          import('../Admin/admin_preview_form/admin_preview_form.module').then(
            (m) => m.Admin_preview_formModule
          ),
      },
      {
        path: 'print_form/:form_no',
        loadChildren: () =>
          import('../Admin/print_form/print_form.module').then(
            (m) => m.Print_formModule
          ),
      },
      {
        path: 'admin_approve',
        loadChildren: () =>
          import('../Admin/admin_approve/admin_approve.module').then(
            (m) => m.Admin_approveModule
          ),
      },
      {
        path: 'view_form/:form_no/:mem_type',
        loadChildren: () =>
          import('../Admin/view_form/view_form.module').then(
            (m) => m.View_formModule
          ),
      },
      {
        path: 'approve_form',
        loadChildren: () =>
          import('../Admin/approve_form/approve_form.module').then(
            (m) => m.Approve_formModule
          ),
      },
      {
        path: 'view_approve_form/:form_no/:mem_type/:pay_mode',
        loadChildren: () =>
          import('../Admin/view_approve_form/view_approve_form.module').then(
            (m) => m.View_approve_formModule
          ),
      },
      {
        path: 'print_life_form/:form_no',
        loadChildren: () =>
          import('../Admin/print_life_form/print_life_form.module').then(
            (m) => m.Print_life_formModule
          ),
      },
      {
        path: 'print_associate_form/:form_no',
        loadChildren: () =>
          import(
            '../Admin/print_associate_form/print_associate_form.module'
          ).then((m) => m.Print_associate_formModule),
      },
      {
        path: 'admin_premium_approve',
        loadChildren: () =>
          import(
            '../Admin/admin_premium_approve/admin_premium_approve.module'
          ).then((m) => m.Admin_premium_approveModule),
      },
      {
        path: 'policy_view_form/:form_no/:member_id/:phone_no',
        loadChildren: () =>
          import('../Admin/policy_view_form/policy_view_form.module').then(
            (m) => m.Policy_view_formModule
          ),
      },
      {
        path: 'super_policy_approve',
        loadChildren: () =>
          import(
            '../Admin/super_policy_approve/super_policy_approve.module'
          ).then((m) => m.Super_policy_approveModule),
      },
      // {
      //   path: 'super_premium_form',
      //   loadChildren: () =>
      //     import('../Admin/super_premium_form/super_premium_form.module').then(
      //       (m) => m.Super_premium_formModule
      //     ),
      // },
      {
        path: 'view_super_approve_form/:form_no/:member_id/:phone_no',
        loadChildren: () =>
          import(
            '../Admin/view_supper_approve_form/view_supper_approve_form.module'
          ).then((m) => m.View_supper_approve_formModule),
      },
      {
        path: 'admin_group_premium_approve',
        loadChildren: () =>
          import(
            '../Admin/admin_group_premium_approve/admin_group_premium_approve.module'
          ).then((m) => m.Admin_group_premium_approveModule),
      },
      {
        path: 'group_policy_view_form/:form_no/:member_id',
        loadChildren: () =>
          import(
            '../Admin/group_policy_view_form/group_policy_view_form.module'
          ).then((m) => m.Group_policy_view_formModule),
      },
      {
        path: 'group_policy_approve_form',
        loadChildren: () =>
          import(
            '../Admin/group_policy_approve_form/group_policy_approve_form.module'
          ).then((m) => m.Group_policy_approve_formModule),
      },
      {
        path: 'view_group_approve_form/:form_no/:member_id',
        loadChildren: () =>
          import(
            '../Admin/view_group_approve_form/view_group_approve_form.module'
          ).then((m) => m.View_group_approve_formModule),
      },
      {
        path: 'subs_depo_entry',
        loadChildren: () =>
          import(
            '../Admin/subs_depo/subs-depo-entry/subs-depo-entry.module'
          ).then((m) => m.SubsDepoEntryModule),
      },
      {
        path: 'subs_depo_approve',
        loadChildren: () =>
          import(
            '../Admin/subs_depo/subs-depo-approve/subs-depo-approve.module'
          ).then((m) => m.SubsDepoApproveModule),
      },
      {
        path: 'subs_depo_appr_entry/:trn_no/:frm_no',
        loadChildren: () =>
          import(
            '../Admin/subs_depo/subs-depo-appr-entry/subs-depo-appr-entry.module'
          ).then((m) => m.SubsDepoApprEntryModule),
      },
      {
        path: 'member_list_report',
        loadChildren: () =>
          import('../Admin/member_list_report/member_list_report.module').then(
            (m) => m.Member_list_reportModule
          ),
      },
      {
        path: 'show_memlist_report/:period/:member_type',
        loadChildren: () =>
          import(
            '../Admin/show_memlist_report/show_memlist_report.module'
          ).then((m) => m.Show_memlist_reportModule),
      },
      {
        path: 'member_trans_report',
        loadChildren: () =>
          import(
            '../Admin/member_trans_report/member_trans_report.module'
          ).then((m) => m.Member_trans_reportModule),
      },
      {
        path: 'show_transaction_report/:from_dt/:to_dt/:pay_mode',
        loadChildren: () =>
          import(
            '../Admin/show_transaction_report/show_transaction_report.module'
          ).then((m) => m.Show_transaction_reportModule),
      },
      {
        path: 'subscription_cleared_upto',
        loadChildren: () =>
          import(
            '../Admin/subscription_cleared_upto/subscription_cleared_upto.module'
          ).then((m) => m.Subscription_cleared_uptoModule),
      },
      {
        path: 'show_clear_report/:period/:member_type',
        loadChildren: () =>
          import('../Admin/show_clear_report/show_clear_report.module').then(
            (m) => m.Show_clear_reportModule
          ),
      },
      {
        path: 'memb_list',
        loadChildren: () =>
          import('../Admin/member_details/member-list/member-list.module').then(
            (m) => m.MemberListModule
          ),
      },
      {
        path: 'mem_edit/:form_no',
        loadChildren: () =>
          import('../Admin/member_details/member-edit/member-edit.module').then(
            (m) => m.MemberEditModule
          ),
      },
      {
        path: 'change_password',
        loadChildren: () =>
          import('../Admin/change_password/change_password.module').then(
            (m) => m.Change_passwordModule
          ),
      },
      {
        path: 'stp_ins_report',
        loadChildren: () =>
          import(
            '../Admin/stp_ins_report/stp_ins_report.module'
          ).then((m) => m.Stp_ins_reportModule),
      },
      {
        path: 'show_stp_ins_report/:from_dt/:to_dt/:status',
        loadChildren: () =>
          import(
            '../Admin/show_stp_ins_report/show_stp_ins_report.module'
          ).then((m) => m.Show_stp_ins_reportModule),
      },
      {
        path: 'member_policy_list',
        loadChildren: () =>
          import('../Admin/member_policy_details/member_policy_list/member_policy_list.module').then(
            (m) => m.Member_policy_listModule
          ),
      },
      {
        path: 'member_policy_edit/:form_no/:member_id/:policy_type',
        loadChildren: () =>
          import('../Admin/member_policy_details/member_policy_edit/member_policy_edit.module').then(
            (m) => m.Member_policy_editModule
          ),
      },
      {
        path: 'member_gmp_list',
        loadChildren: () =>
          import('../Admin/member_gmp_details/member_gmp_list/member_gmp_list.module').then(
            (m) => m.Member_gmp_listModule
          ),
      },
      {
        path: 'member_gmp_edit/:form_no/:member_id/:policy_type/:memb_oprn',
        loadChildren: () =>
          import('../Admin/member_gmp_details/member_gmp_edit/member_gmp_edit.module').then(
            (m) => m.Member_gmp_editModule
          ),
      },
      {
        path: 'gmp_ins_report',
        loadChildren: () =>
          import(
            '../Admin/gmp_ins_report/gmp_ins_report.module'
          ).then((m) => m.Gmp_ins_reportModule),
      },
      {
        path: 'show_gmp_ins_report/:from_dt/:to_dt/:status',
        loadChildren: () =>
          import(
            '../Admin/show_gmp_ins_report/show_gmp_ins_report.module'
          ).then((m) => m.Show_gmp_ins_reportModule),
      },
      {
        path: 'money_receipt/:member_id/:trn_id',
        loadChildren: () =>
          import('../Admin/money_receipt/money_receipt.module').then(
            (m) => m.Money_receiptModule
          ),
      },
      {
        path: 'accept_money_receipt/:form_no/:trn_id',
        loadChildren: () =>
          import('../Admin/accept_money_receipt/accept_money_receipt.module').then(
            (m) => m.Accept_money_receiptModule
          ),
      },
      {
        path: 'accept_gmp_money_receipt/:form_no/:trn_id',
        loadChildren: () =>
          import('../Admin/accept_gmp_money_receipt/accept_gmp_money_receipt.module').then(
            (m) => m.Accept_gmp_money_receiptModule
          ),
      },
      {
        path: 'gmp_memb_trans_report',
        loadChildren: () =>
          import(
            '../Admin/gmp_memb_trans_report/gmp_memb_trans_report.module'
          ).then((m) => m.Gmp_memb_trans_reportModule),
      },
      {
        path: 'show_gmp_trans_report/:from_dt/:to_dt',
        loadChildren: () =>
          import(
            '../Admin/show_gmp_trans_report/show_gmp_trans_report.module'
          ).then((m) => m.Show_gmp_trans_reportModule),
      },
      {
        path: 'approve_money_receipt_transaction',
        loadChildren: () =>
          import(
            '../Admin/approve_money_receipt_transaction/approve_money_receipt_transaction.module'
          ).then((m) => m.Approve_money_receipt_transactionModule),
      },
      {
        path: 'show_approve_transaction_report/:from_dt/:to_dt/:member_id',
        loadChildren: () =>
          import(
            '../Admin/show_approve_transaction_report/show_approve_transaction_report.module'
          ).then((m) => m.Show_approve_transaction_reportModule),
      },
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
    AvatarModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AdminComponent, SidebarComponent, HeaderComponent],
})
export class AdminModule {}