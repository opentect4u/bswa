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
import { AvatarModule } from 'primeng/avatar';
import { StpHeaderComponent } from './stp-header/stp-header.component';
import { StpSidebarComponent } from './stp-sidebar/stp-sidebar.component'

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
        path: 'stp_dashboard',
        loadChildren: () =>
          import('../main/stp_dashboard/stp_dashboard.module').then(
            (m) => m.Stp_dashboardModule
          ),
      },
         {
        path: 'stp_memb_dtls',
        loadChildren: () =>
          import('../main/stp_member_details/stp_member_details.module').then(
            (m) => m.Stp_member_detailsModule
          ),
      },
      {
        path: 'memb_dtls',
        loadChildren: () =>
          import('./memb-dtls/memb-dtls.module').then(
            (m) => m.MembDtlsModule
          ),
      },
      {
        path: 'trn_history',
        loadChildren: () =>
          import('./user_transaction/trn-history/trn-history.module').then(
            (m) => m.TrnHistoryModule
          ),
      },
      {
        path: 'trn_history_view/:trn_id',
        loadChildren: () =>
          import('./user_transaction/trn-history-view/trn-history-view.module').then(
            (m) => m.TrnHistoryViewModule
          ),
      },
      {
        path: 'ins_form',
        loadChildren: () =>
          import('../main/child_group_policy/child_group_policy.module').then(
            (m) => m.Child_group_policyModule
          ),
      },
      {
        path: 'depo_subs',
        loadChildren: () =>
          import('./depo-trns/depo-trns.module').then(
            (m) => m.DepoTrnsModule
          ),
      },
      {
        path: 'memb_noti',
        loadChildren: () =>
          import('../main/child_group_policy/child_group_policy.module').then(
            (m) => m.Child_group_policyModule
          ),
      },
      {
        path: 'money_receipt_member/:member_id/:trn_id',
        loadChildren: () =>
          import('../main/money_receipt_member/money_receipt_member.module').then(
            (m) => m.Money_receipt_memberModule
          ),
      },
      {
        path: 'money_receipt_member/:trn_id',
        loadChildren: () =>
          import('../main/money_receipt_member/money_receipt_member.module').then(
            (m) => m.Money_receipt_memberModule
          ),
      },
      {
        path: 'ins_dtls',
        loadChildren: () =>
          import('./ins_dtls/ins_dtls.module').then(
            (m) => m.Ins_dtlsModule
          ),
      },
      {
        path: 'change_password_member',
        loadChildren: () =>
          import('../main/change_password_member/change_password_member.module').then(
            (m) => m.Change_password_memberModule
          ),
      },
       {
        path: 'child_policy',
        loadChildren: () =>
          import('./member_child_policy_dtls/member_child_policy_dtls.module').then(
            (m) => m.Member_child_policy_dtlsModule
          ),
      },
       {
        path: 'trn_history_child',
        loadChildren: () =>
          import('./user_transaction/trn_history_child/trn_history_child.module').then(
            (m) => m.Trn_history_childModule
          ),
      },
      {
        path: 'trn_history_child_view/:trn_id',
        loadChildren: () =>
          import('./user_transaction/trn_history_child_view/trn_history_child_view.module').then(
            (m) => m.Trn_history_child_viewModule
          ),
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
    RouterModule.forChild(routes),
  ],
  declarations: [MainComponent, SidebarComponent, HeaderComponent,StpHeaderComponent,StpSidebarComponent],
})
export class MainModule {}
