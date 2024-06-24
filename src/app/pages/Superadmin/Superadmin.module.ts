import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperadminComponent } from './Superadmin.component';
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

const routes: Routes = [
  {
    path: '',
    component: SuperadminComponent,
    children: [
      {
        path: 'fee_type',
        loadChildren: () =>
          import('../Superadmin/admin_fee_type/admin_fee_type.module').then(
            (m) => m.Admin_fee_typeModule
          ),
      },
      {
        path: 'add_fee_type/:flag',
        loadChildren: () =>
          import('../Superadmin/add_fee_type/add_fee_type.module').then(
            (m) => m.Add_fee_typeModule
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
    ProgressBarModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SuperadminComponent, SidebarComponent, HeaderComponent]
})
export class SuperadminModule { }
