import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubsDepoApprEntryComponent } from './subs-depo-appr-entry.component';
import { RouterModule, Routes } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

const routes:Routes=[
  {path:'',component:SubsDepoApprEntryComponent}
]

@NgModule({
  imports: [
    CommonModule,
    DividerModule,
    CardModule,
    ButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubsDepoApprEntryComponent]
})
export class SubsDepoApprEntryModule { }
