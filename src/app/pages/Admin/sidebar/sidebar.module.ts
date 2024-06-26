import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';

import { SidebarModule as SideModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ScrollerModule } from 'primeng/scroller';
import { DividerModule } from 'primeng/divider';

@NgModule({
  imports: [
    CommonModule,
    MenuModule,
    PanelMenuModule,
    SideModule,
    ScrollerModule,
    DividerModule,
  ],
  declarations: [SidebarComponent]
})
export class SidebarModule { }
