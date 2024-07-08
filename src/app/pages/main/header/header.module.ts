import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';

import { ToolbarModule } from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ScrollerModule } from 'primeng/scroller';
import { AvatarModule } from 'primeng/avatar';

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
    AvatarModule,
  ],
  // exports: [HeaderComponent],
  declarations: [HeaderComponent],
})
export class HeaderModule {}
