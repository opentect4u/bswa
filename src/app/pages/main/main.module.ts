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
  declarations: [MainComponent, SidebarComponent, HeaderComponent],
})
export class MainModule {}
